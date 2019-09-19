require 'aws-sdk-s3'

class Api::V1::EventObjectsController < ApplicationController
  before_action :authenticate_user!
  before_action :verify_organizer!, only: %i[create update destroy]
  before_action :set_event_object, only: %i[show update destroy]


  def index
    @events_objects = EventObject.all
    render json: @events_objects
  end

  def show
    render json: @event_object
  end

  def create
    @events_objects = EventObject.new(event_object_params)
    @events_objects.location = url_for(@events_objects.file) if @events_objects.file.attached?
    if @events_objects.save
      render json: @events_objects
    else
      render json: @events_objects.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    @event_object.file.purge
    if @event_object.update(event_object_params)
      @event_object.location = url_for(@event_object.file)
      @event_object.save
      render json: @event_object
    else
      render json: @event_object.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @event_object.destroy
    head :no_content
  end

  private

  def set_event_object
    @event_object ||= EventObject.find_by(id: params[:id])
    return head :not_found unless @event_object
  end

  def verify_organizer!
    return head :forbidden unless current_user.organizer?
  end

  def event_object_params
    params.permit(:name, :description, :file)
  end
end
