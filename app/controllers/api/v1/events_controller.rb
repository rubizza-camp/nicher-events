# :reek:InstanceVariableAssumption
# :reek:NilCheck
# :reek:MissingSafeMethod
# :reek:TooManyMethods

class Api::V1::EventsController < ApplicationController
  before_action :authenticate_user!, only: %i[create update destroy]
  before_action :verify_organizer!, only: %i[create update destroy]
  before_action :set_events, only: %i[index]
  before_action :set_event, only: %i[show update destroy]
  before_action :verify_organization!, only: %i[update destroy]
  before_action :verify_date!, only: %i[destroy]

  def index
    render json: @events
  end

  def show
    return head :forbidden unless @event.social? || organization_event? || subscribed_event?

    render json: @event
  end

  def create
    @event = current_user.events.new(event_params)
    if @event.save
      set_link_map_for_event_layout unless params.dig(:event, :event_layouts_attributes).nil?
      render json: @event, status: :created
    else
      render json: @event.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    if @event.update(event_params)
      update_link_map_for_event_layout unless params.dig(:event, :event_layouts_attributes).nil?
      render json: @event
    else
      render json: @event.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    send_notify
    @event.attendances.destroy_all
    @event.destroy
    head :no_content
  end

  private

  def organization_event?
    current_user&.organization&.events&.find_by(id: @event.id).present?
  end

  def subscribed_event?
    current_user.attendances.find_by(event_id: @event.id).present?
  end

  def send_notify
    @subscribers = User.subscribers(@event.id).to_a
    email_params = { author: current_user.email, subscribers: @subscribers, event: @event }
    EventMailer.with(email_params).cancelled_event_email.deliver_later
  end

  def verify_date!
    render json: { errors: ['This event took place'] }, status: :unprocessable_entity if @event.date < Time.zone.now
  end

  def set_events
    @events = Event.social
    @events += current_user.organization.events.confidential if current_user&.organizer?
    @events += Event.confidential.available_for_user(current_user&.id)
  end

  def set_event
    @event = Event.find_by(id: params[:id])
    return head :not_found unless @event
  end

  def verify_organization!
    return head :forbidden unless current_user.organization.events.find_by(id: @event.id)
  end

  def verify_organizer!
    return head :forbidden unless current_user.organizer?
  end

  def event_params
    status_str = params.dig(:event, :status)
    status = Event.statuses[status_str]
    check_for_virtual_map
    # rubocop:disable Metrics/LineLength
    params.require(:event).permit(:name, :date, :description, event_layouts_attributes: [:virtual_map]).merge(status: status)
    # rubocop:enable Metrics/LineLength
  end

  def set_link_map_for_event_layout
    current_layout = @event.event_layouts.take
    current_layout.link_map = url_for(current_layout.virtual_map)
  end

  def update_link_map_for_event_layout
    current_layout = @event.event_layouts.take
    current_layout.link_map = rails_blob_path(current_layout.virtual_map, only_path: true)
  end

  def check_for_virtual_map
    if params.dig(:event, :event_layouts_attributes, :virtual_map).class == ActionDispatch::Http::UploadedFile
      params['event']['event_layouts_attributes'] = [params.dig(:event, :event_layouts_attributes)]
    else
      params['event'].delete :event_layouts_attributes
    end
  end
end
