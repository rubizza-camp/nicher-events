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
  include Swagger::Blocks
  swagger_path '/api/v1/events' do
    operation :get do
      key :description, 'event response'
      key :summary, 'Fetches all events available for current user'
      key :description, 'Returns all social events for unauthorized user, social and private - for atendee,'\
    ' all by his/her organization for organizer'
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
  end

  swagger_path '/api/v1/events/:id' do
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
      key :description, 'Checks whether event is available for user'\
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
