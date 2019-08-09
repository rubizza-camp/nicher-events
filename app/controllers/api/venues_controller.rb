# :reek:InstanceVariableAssumption
# rubocop:disable Style/ClassAndModuleChildren
class Api::V1::VenuesController < ApplicationController
  def index
    @venues = Venue.all
    render json: @venues
  end

  def show
    @venue = Venue.find(params[:id])
    render json: @venue
  end

  def create
    @venue = Venue.new(venue_params)
    if @venue.save
      render json: @venue, status: :created
    else
      render json: @venue.errors, status: :unprocessable_entity
    end
  end

  def update
    @event = Venue.find(params[:id])
    if @venue.update_attributes(venue_params)
      render json: @venue, status: :updated
    else
      render json: @venue.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @venue = Venue.find(params[:id])
    @venue.destroy
    head :no_content
  end

  private

  def venue_params
    params.require(:venue).permit(:address, :description, :people_capacity)
  end
end
# rubocop:enable Style/ClassAndModuleChildren
