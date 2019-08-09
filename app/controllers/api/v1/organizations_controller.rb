# rubocop:disable Style/ClassAndModuleChildren
# :reek:InstanceVariableAssumption
class Api::V1::OrganizationsController < ApplicationController
  # skip_before_action :verify_authenticity_token
  # before_action :authenticate_user!
  before_action :set_organization, only: %i[show update destroy]

  def index
    binding.pry
    @organizations = Organization.all
    render json: @organizations
  end

  def show
    if @organization
      render json: @organization
    else
      render json: { status: :unprocessable_entity }
    end
  end

  def create
    @organization = Organization.new(organization_params)
    if @organization.save
      render json: @organization, status: :created
    else
      render json: @organization.errors, status: :unprocessable_entity
    end
  end

  def update
    if @organization.update(organization_params)
      render json: @organization, status: :ok
    else
      render json: @organization.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if @organization
      @organization.destroy
      head :no_content
    else
      render json: { status: :unprocessable_entity }
    end
  end

  private

  def set_organization
    @organization = Organization.find_by(id: params[:id])
  end

  def organization_params
    params.require(:organization).permit(:name, :description)
  end
end
# rubocop:enable Style/ClassAndModuleChildren
