# :reek:InstanceVariableAssumption
# rubocop:disable Style/ClassAndModuleChildren
class Api::V1::VenuesController < ApplicationController
  before_action :authenticate_user!, only: %i[create update destroy]
  before_action :set_venue, only: %i[show update destroy]

  def index
    @venues = Venue.all.reverse
    render json: @venues, status: :created
  end

  def show
    if @venue
      render json: @venue
    else
      render json: { status: :not_found }
    end
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
    if @venue.destroy
      render json: { status: :deleted }
    else
      render json: @venue.errors.full_messages, status: :unprocessable_entity
    end
  rescue NoMethodError
    render json: 'Venue not found', status: :not_found
  end

  private

  def set_venue
    @venue = Venue.find_by(id: params[:id])
  end

  def venue_params
    params.require(:venue).permit(:address, :description, :people_capacity)
  end
end
# rubocop:enable Style/ClassAndModuleChildren
