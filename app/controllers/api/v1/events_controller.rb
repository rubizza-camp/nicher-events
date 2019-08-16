# rubocop:disable Style/ClassAndModuleChildren
# :reek:InstanceVariableAssumption
# :reek:NilCheck

class Api::V1::EventsController < ApplicationController
  before_action :authenticate_user!, only: %i[create update destroy]
  before_action :set_current_user, only: %i[index show]
  before_action :set_current_user_event, only: %i[update destroy]

  def index
    @events = if current_user&.organizer?
                Event.all
              else
                Event.where(status: :social)
              end
    render json: @events
  end

  def show
    return head :not_found unless event
    return render json: {}, status: :unauthorized unless event_available?

    render json: event
  end

  def create
    return head :not_found unless current_user&.organizer?

    @event = current_user.events.new(event_params)
    if @event.save
      render json: @event, status: :created
    else
      render json: @event.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    return head :not_found unless @current_user_event

    if @current_user_event.update(event_params)
      render json: @current_user_event
    else
      render json: @current_user_event.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    return head :not_found unless @current_user_event

    @current_user_event.destroy
    head :no_content
  end

  private

  def set_current_user
    authenticate_user! if params[:authentication_required] == 'true'
  end

  def event_available?
    event&.social? || current_user&.organizer?
  end

  def event
    @event ||= Event.find_by(id: params[:id])
  end

  def set_current_user_event
    @current_user_event = current_user.events.find_by(id: params[:id])
  end

  def event_params
    status_str = params.dig(:event, :status)
    status = Event.statuses[status_str]
    params.require(:event).permit(:name, :date, :description).merge(status: status)
  end
end
# rubocop:enable Style/ClassAndModuleChildren
