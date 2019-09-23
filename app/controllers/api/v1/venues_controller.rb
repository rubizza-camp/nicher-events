# :reek:InstanceVariableAssumption :reek:NilCheck
class Api::V1::VenuesController < ApplicationController
  before_action :authenticate_user!
  before_action :organizer?, only: %i[create update destroy]
  before_action :set_venue, only: %i[show update destroy]
  include Swagger::Blocks

  swagger_path '/api/v1/venues' do
    operation :get do
      key :summary, 'Fetches all venues'
      key :description, 'Returns all venues'
      key :operationId, 'FetchVenues'
      key :tags, [
          'venue'
      ]
      response 200 do
        schema do
          key :type, :array
          items do
            key :'$ref', :Venue
          end
        end
      end
    end
    operation :post do
      key :summary, 'Create Venue'
      key :description, 'Creates a new venue.  Duplicates doesn\'t allowed'
      key :operationId, 'addVenue'
      key :produces, [
          'application/json'
      ]
      key :tags, [
          'venue'
      ]
      parameter do
        key :name, :venue
        key :in, :body
        key :description, 'Venue to add to db'
        key :required, true
        schema do
          key :'$ref', :VenueInput
        end
      end
      response 200 do
        key :description, 'venue response'
        schema do
          key :'$ref', :Venue
        end
      end
    end
  end

  swagger_path 'api/v1/venues/:id' do
    operation :get do
      key :summary, 'Find Venue by ID'
      key :description, 'Returns a single venue if the user has access'
      key :operationId, 'findVenueById'
      key :tags, [
          'venue'
      ]
      parameter do
        key :name, :id
        key :in, :path
        key :description, 'ID of venue to fetch'
        key :required, true
        key :type, :integer
        key :format, :int64
      end
      response 200 do
        key :description, 'venue response'
        schema do
          key :'$ref', :Venue
        end
      end
    end

    operation :get do
      key :summary, 'Find Venue by ID'
      key :description, 'Returns a single venue if the user has access'
      key :operationId, 'findVenueById'
      key :tags, [
          'venue'
      ]
      parameter do
        key :name, :id
        key :in, :path
        key :description, 'ID of venue to fetch'
        key :required, true
        key :type, :integer
        key :format, :int64
      end
      response 200 do
        key :description, 'venue response'
        schema do
          key :'$ref', :Venue
        end
      end
    end

    operation :patch do
      key :summary, 'Update Venue'
      key :description, 'Returns updated venue'
      key :operationId, 'UpdateVenue'
      key :tags, [
          'venue'
      ]
      parameter do
        key :name, :id
        key :in, :path
        key :description, 'ID of venue to fetch'
        key :required, true
        key :type, :integer
        key :format, :int64
      end
      response 200 do
        key :description, 'venue response'
        schema do
          key :'$ref', :Venue
        end
      end
    end

    operation :delete do
      key :summary, 'Delete Venue'
      key :description, 'deletes a single venue based on the ID supplied'
      key :operationId, 'deleteVenue'
      key :tags, [
          'venue'
      ]
      response 204 do
        key :description, 'venue deleted'
      end
      response :default do
        key :description, 'unexpected error'
        schema do
          key :'$ref', :ErrorModel
        end
      end
    end
  end

  def index
    @venues = Venue.all
    render json: @venues
  end

  def show
    render json: @venue
  end

  def create
    @venue = Venue.new(venue_params)
    if @venue.save
      render json: @venue, status: :created
    else
      render json: @venue.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    if @venue.update_attributes(venue_params)
      render json: @venue
    else
      render json: @venue.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @venue.destroy
    head :no_content
  end

  private

  def set_venue
    @venue = Venue.find_by(id: params[:id])
    head :not_found unless @venue
  end

  def organizer?
    render json: { errors: ['Only organizer can do this'] }, status: :forbidden unless current_user.organizer?
  end

  def venue_params
    params.require(:venue).permit(:name, :address, :description, :people_capacity)
  end
end
