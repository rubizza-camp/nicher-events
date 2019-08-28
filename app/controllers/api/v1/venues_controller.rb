# :reek:InstanceVariableAssumption :reek:NilCheck
class Api::V1::VenuesController < ApplicationController
  before_action :authenticate_user!
  before_action :organizer?, only: %i[create update destroy]
  before_action :set_venue, only: %i[show update destroy]

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
