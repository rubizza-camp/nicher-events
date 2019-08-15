# rubocop:disable Style/ClassAndModuleChildren
# :reek:InstanceVariableAssumption

class Api::V1::EventsController < ApplicationController
  before_action :authenticate_user!, only: %i[create update destroy]
  before_action :set_current_user, only: %i[index show]
  before_action :set_event_of_current_user, only: %i[update destroy]

  def index
    @events = if organizer?
                Event.all
              else
                Event.where(status: :social)
              end
    render json: @events
  end

  def show
    return render json: {}, status: :not_found unless event

    return render json: {}, status: :unauthorized if unavailable_event?

    render json: event
  end

  def create
    return render json: {}, status: :not_found unless organizer?

    @event = current_user.event.new(event_params)
    if @event.save
      render json: @event, status: :created
    else
      render json: @event.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    return render json: {}, status: :not_found unless @event_of_current_user

    if @event_of_current_user.update(event_params)
      render json: @event_of_current_user, status: :ok
    else
      render json: @event_of_current_user.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    return render json: {}, status: :not_found unless @event_of_current_user

    @event_of_current_user.destroy
    head :no_content
  end

  private

  def set_current_user
    authenticate_user! if params[:is_user_authenticate] == 'true'
  end

  def unavailable_event?
    if !event.blank?
      (event.status == 'confidential') && !organizer?
    else
      true
    end
  end

  def organizer?
    !current_user.blank? && (current_user.role == 'organizer')
  end

  def event
    @event ||= Event.find_by(id: params[:id])
  end

  def set_event_of_current_user
    @event_of_current_user = current_user.event.find_by(id: params[:id])
  end

  def event_params
    status_str = params.dig(:event, :status)
    status = Event.statuses[status_str]
    params.require(:event).permit(:name, :date, :description).merge(status: status)
  end
end
# rubocop:enable Style/ClassAndModuleChildren
