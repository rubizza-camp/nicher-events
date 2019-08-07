# rubocop:disable Style/ClassAndModuleChildren
# :reek:InstanceVariableAssumption
class Api::V1::OrganizationsController < ApplicationController
  before_action :set_organization, only: %i[show update]
  before_action :authenticate_user!
  before_action :unauthorized_user, only: %i[create update]

  def index
    if current_user[:role] == 'organizer'
      @organizations = Organization.all
      render json: @organizations
    else
      head :unauthorized
    end
  end

  def show
    if @organization && current_user[:role] == 'organizer'
      render json: @organization
    else
      head :not_found
    end
  end

  def create
    if !current_user.organization
      save_organization
    else
      render json: current_user.organization.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    return head :unauthorized unless organization_owner?

    if current_user.organization.update(organization_params)
      render json: current_user.organization
    else
      render json: current_user.organization.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def save_organization
    organization = Organization.new(organization_params)
    current_user.organization = organization
    if current_user.organization.save
      render json: current_user.organization, status: :created
    else
      render json: current_user.organization.errors.full_messages, status: :unprocessable_entity
    end
  end

  def unauthorized_user
    return head :unauthorized unless current_user[:role] == 'organizer'
  end

  def set_organization
    @organization = Organization.find_by(id: params[:id])
  end

  def organization_owner?
    @organization.id == @current_user.organization.id
  end

  def organization_params
    params.require(:organization).permit(:name, :description)
  end
end
# rubocop:enable Style/ClassAndModuleChildren
