# :reek:InstanceVariableAssumption
# :reek:NilCheck
# :reek:MissingSafeMethod
# rubocop:disable Metrics/BlockLength
# rubocop:disable Metrics/ClassLength
class Api::V1::EventsController < ApplicationController
  before_action :authenticate_user!, only: %i[create update destroy]
  before_action :verify_organizer!, only: %i[create update destroy]
  before_action :set_events, only: %i[index]
  before_action :set_event, only: %i[show update destroy]
  before_action :verify_organization!, only: %i[update destroy]
  before_action :verify_date!, only: %i[destroy]
  include Swagger::Blocks
  swagger_path '/api/v1/attendances' do
    operation :get do
      key :summary, 'Fetches all events available for current user'
      key :description, 'Returns all social events for unauthorized user, social and private - for atendee,'\
    ' all by his/her organization - for organizer'
      key :operationId, 'IndexEvents'
      key :tags, ['event']
      response 200 do
        schema do
          key :type, :array
          items do
            key :'$ref', :Event
          end
        end
      end
    end
    operation :post do
      key :summary, 'Creates new event'
      key :description, 'Creates new event, if user is organizer'
      key :operationId, 'CreateEvents'
      key :tags, ['event']
      parameter do
        key :name, :event
        key :in, :query
        key :description, 'Parameters of new event'
        key :required, true
        schema do
          key :'$ref', :EventInput
        end
      end
      response 200 do
        schema do
          key :'$ref', :Event
        end
      end
      response 401 do
        key :description, 'Current user is not logged in'
        schema do
          key :'$ref', :ErrorModel
        end
      end
      response 403 do
        key :description, 'Current user can not create events, he is attendee'
        schema do
          key :'$ref', :ErrorModel
        end
      end
      response 422 do
        key :description, 'Params of the event are invalid'
        schema do
          key :'$ref', :ErrorListModel
        end
      end
    end
  end

  swagger_path '/api/v1/events/{id}' do
    operation :get do
      parameter do
        key :name, :id
        key :in, :path
        key :description, 'ID of event to fetch'
        key :required, true
        key :type, :integer
        key :example, 1
      end
      key :description, 'event response'
      key :summary, 'Fetches event by id'
      key :description, 'Checks, whether event is available for user'\
      ' and returns event object with given id'
      key :operationId, 'ShowEvent'
      key :tags, ['event']
      response 200 do
        schema do
          key :'$ref', :Event
        end
      end
      response 403 do
        key :description, 'Current user has no access to this event'
        schema do
          key :'$ref', :ErrorModel
        end
      end
      response 404 do
        key :description, 'Invalid id provided'
        schema do
          key :'$ref', :ErrorModel
        end
      end
    end
    operation :patch do
      parameter do
        key :name, :id
        key :in, :path
        key :description, 'ID of event to update'
        key :required, true
        key :type, :integer
        key :example, 1
      end
      parameter do
        key :name, :event
        key :in, :query
        key :description, 'Parameters of updated event'
        key :required, true
        schema do
          key :'$ref', :EventInput
        end
      end
      key :summary, 'Updates event by id'
      key :description, 'Checks, whether event is available for update'\
      ' by user, and returns event object with given id and updated attributes'
      key :operationId, 'ShowEvent'
      key :tags, ['event']
      response 200 do
        schema do
          key :'$ref', :Event
        end
      end
      response 401 do
        key :description, 'Current user is not logged in'
        schema do
          key :'$ref', :ErrorModel
        end
      end
      response 403 do
        key :description, 'Current user can not update the event, he is attendee or an organizer'\
        ' who doesn\'t own this event'
        schema do
          key :'$ref', :ErrorModel
        end
      end
      response 404 do
        key :description, 'There is no event with such id'
        schema do
          key :'$ref', :ErrorModel
        end
      end
      response 422 do
        key :description, 'Params of the event are invalid'
        schema do
          key :'$ref', :ErrorListModel
        end
      end
    end
    operation :delete do
      parameter do
        key :name, :id
        key :in, :path
        key :description, 'ID of event to delete'
        key :required, true
        key :type, :integer
        key :example, 1
      end
      key :summary, 'Deletes event by id'
      key :description, 'Checks, whether event is available for delete'\
      ' by user, sends notification e-mail to all of its attendees and deletes it'
      key :operationId, 'DeleteEvent'
      key :tags, ['event']
      response 204 do
        key :description, 'Successful delete'
      end
      response 401 do
        key :description, 'Current user is not logged in'
        schema do
          key :'$ref', :ErrorModel
        end
      end
      response 403 do
        key :description, 'Current user can not delete the event, he is attendee or an organizer'\
        ' who doesn\'t own this event'
        schema do
          key :'$ref', :ErrorModel
        end
      end
      response 404 do
        key :description, 'There is no event with such id'
        schema do
          key :'$ref', :ErrorModel
        end
      end
      response 422 do
        key :description, 'This event took place in the past'
        schema do
          key :'$ref', :ErrorListModel
        end
      end
    end
  end

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
      render json: @event, status: :created
    else
      render json: @event.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    if @event.update(event_params)
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
    @events += Event.available_for_user(current_user&.id)
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
    params.require(:event).permit(:name, :date, :description).merge(status: status)
  end
end
# rubocop:enable Metrics/BlockLength
# rubocop:enable Metrics/ClassLength
