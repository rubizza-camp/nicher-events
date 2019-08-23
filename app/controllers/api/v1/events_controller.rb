# :reek:InstanceVariableAssumption
# :reek:NilCheck

class Api::V1::EventsController < ApplicationController
  before_action :authenticate_user!, :verify_organizer, only: %i[create update destroy]
  before_action :set_current_user, only: %i[index show]
  before_action :verify_event_exist, only: %i[show update destroy]

  def index
    @available_events = social_event
    @available_events += confidential_event.to_a
    render json: @available_events
  end

  def show
    return head :forbidden unless available_event.present?

    render json: available_event
  end

  def create
    @event = current_user.events.new(event_params)
    if @event.save
      render json: @event, status: :created
    else
      render json: @event.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    return head :forbidden unless current_user_organization_event

    if @current_user_organization_event.update(event_params)
      render json: @current_user_organization_event
    else
      render json: @current_user_organization_event.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    return head :forbidden unless current_user_organization_event

    @current_user_organization_event.destroy
    head :no_content
  end

  private

  def verify_event_exist
    return head :not_found unless event_exist?
  end

  def verify_organizer
    return head :forbidden unless current_user&.organizer?
  end

  def event_exist?
    Event.find_by(id: params[:id]).present?
  end

  def social_event
    @social_event ||= Event.where(status: :social)
  end

  def confidential_event
    return unless current_user&.organizer?

    @confidential_event ||= current_user.organization.events.where(status: :confidential).all
  end

  def set_current_user
    authenticate_user! if params[:authentication_required] == 'true'
  end

  def available_event
    @available_event ||= social_event&.find_by(id: params[:id]) || confidential_event&.find_by(id: params[:id])
  end

  def current_user_organization_event
    @current_user_organization_event ||= current_user.organization.events.find_by(id: params[:id])
  end

  def event_params
    status_str = params.dig(:event, :status)
    status = Event.statuses[status_str]
    params.require(:event).permit(:name, :date, :description).merge(status: status)
  end
end
