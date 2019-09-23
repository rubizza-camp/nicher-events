# :reek:InstanceVariableAssumption
# :reek:NilCheck

class Api::V1::AttendancesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_event
  before_action :verify_role_user
  include Swagger::Blocks
  swagger_path '/api/v1/events/{event_id}/attendances/' do
    operation :post do
      key :summary, 'Tries to subscribe user for event with given id'
      key :description, 'Subscribes user to event, unless he or she is subscribed'
      key :operationId, 'CreateAttendance'
      key :tags, ['attendance']
      parameter do
        key :name, 'event_id'
        key :in, :path
        key :type, :integer
        key :description, 'Id of event for subscription'
        key :required, true
      end
      response 201 do
        key :description, 'Attendance was created successfully'
      end
      response 401 do
        key :description, 'Current user hasn\'t signed in'
        schema do
          key :'$ref', :ErrorModel
        end
      end
      response 422 do
        key :description, 'The user has been already subscribed to the event or'\
        ' current user is an organizer and the event belongs to him/her'
        schema do
          key :'$ref', :ErrorModel
        end
      end
    end
  end
  swagger_path '/api/v1/events/{event_id}/attendances/{id}' do
    operation :delete do
      key :summary, 'Tries to unsubscribe user for event with given id'
      key :description, 'Unsubscribes user to event, unless he or she has been already unsubscribed'
      key :operationId, 'DeleteAttendance'
      key :tags, ['attendance']
      parameter do
        key :name, 'event_id'
        key :in, :path
        key :type, :integer
        key :description, 'Id of event for unsubscription'
        key :required, true
      end
      parameter do
        key :name, 'id'
        key :in, :path
        key :type, :integer
        key :description, 'Id of invitation'
        key :required, true
      end
      response 204 do
        key :description, 'Attendance was deleted successfully'
      end
      response 401 do
        key :description, 'Current user hasn\'t signed in'
        schema do
          key :'$ref', :ErrorModel
        end
      end
      response 422 do
        key :description, 'The user has been already unsubscribed from the event or'\
        ' current user is an organizer and the event belongs to him/her'
        schema do
          key :'$ref', :ErrorModel
        end
      end
    end
  end

  def create
    return head :unprocessable_entity if @event.already_subscribed_by_user?(current_user.id)

    @attendance = current_user.attendances.new(attendance_params)
    return head :unprocessable_entity unless @attendance.save

    head :created
  end

  def destroy
    return head :unprocessable_entity unless @event.already_subscribed_by_user?(current_user.id)

    @attendance = current_user.attendances.find_by(event_id: params[:event_id])
    @attendance.destroy
    head :no_content
  end

  private

  def set_event
    @event = Event.find_by(id: params[:event_id]).decorate
  end

  def attendance_params
    params.permit(:event_id)
  end

  def verify_role_user
    return head :unprocessable_entity if @event.editable?(current_user.id)
  end
end
