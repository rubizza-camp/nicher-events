# :reek:InstanceVariableAssumption :reek:NilCheck
# rubocop:disable Style/ClassAndModuleChildren
class Api::V1::VenuesController < ApplicationController
  before_action :is_organizer?, only: %i[create update destroy]
  before_action :set_venue, only: %i[show update destroy]

  def index
    @venues = Venue.all.reverse
    render json: @venues
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
    if @venue&.destroy
      render json: { status: :deleted }
    else
      render json: { status: :not_found }
    end
  end

  private

  def set_venue
    @venue = Venue.find_by(id: params[:id])
    return head :not_found if @venue.nil?
  end

  def is_organizer?
    authenticate_user!
    return render json: ['Only organizer can do this'], status: :unprocessable_entity unless current_user.organizer?
  end

  def venue_params
    params.require(:venue).permit(:address, :description, :people_capacity)
  end
end
# rubocop:enable Style/ClassAndModuleChildren
