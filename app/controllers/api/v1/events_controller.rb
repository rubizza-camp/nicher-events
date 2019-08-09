# rubocop:disable Style/ClassAndModuleChildren
# :reek:InstanceVariableAssumption

class Api::V1::EventsController < ApplicationController
  # skip_before_action :verify_authenticity_token
  before_action :set_event, only: %i[show update destroy]

  def index
    @events = Event.all
    render json: @events
  end

  def show
    if @event
      render json: @event
    else
      render json: { status: :not_found }
    end
  end

  def create
    @event = Event.new(event_params)
    if @event.save
      render json: @event, status: :created
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  def update
    if @event.update(event_params)
      render json: @event, status: :ok
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if @event
      @event.destroy
      head :no_content
    else
      render json: { status: :not_found }
    end
  end

  private

  def set_event
    @event = Event.find_by(id: params[:id])
  end

  def event_params
    status_str = params.dig(:event, :status)
    status = Event.statuses[status_str]
    params.require(:event).permit(:name, :date, :description).merge(status: status)
  end
end
# rubocop:enable Style/ClassAndModuleChildren
