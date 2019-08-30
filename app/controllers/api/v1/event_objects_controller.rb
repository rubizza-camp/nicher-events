require 'aws-sdk-s3'

class Api::V1::EventObjectsController < ApplicationController
  before_action :authenticate_user!


  def index
    @events_objects = EventObject.all
    render json: @events_objects
  end

  # def show
  #   return head :not_found unless event_object
  #
  #   render json: @event_object
  # end

  def create
    binding.pry
    s3 = Aws::S3::Resource.new(region: 'us-east-2',
                               access_key_id: "AKIAIVH6TP56VWT74CRA",
                               secret_access_key: "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")
    original_filename = params['file'].original_filename
    obj = s3.bucket('nicher-events').object(original_filename)
    obj.upload_file(params['file'].tempfile)
    @events_objects = EventObject.new(event_object_params)
    @events_objects.location = obj.public_url
    if @events_objects.save
      render json: @events_objects
    else
      render json: @events_objects.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    return head :not_found unless event_object

    if event_object.update(event_object_params)
      render json: @event_object
    else
      render json: @event_object.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    return head :not_found unless event_object

    @event_object.destroy
    head :no_content
  end

  private

  def event_object_params
    params.require(:event_object).permit(:name, :description, :file, :location)
  end

  def event_object
    @event_object ||= EventObject.find_by(id: params[:id])
  end
end
