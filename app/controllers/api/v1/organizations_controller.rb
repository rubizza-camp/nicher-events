# :reek:InstanceVariableAssumption
class Api::V1::OrganizationsController < ApplicationController
  before_action :set_organization, only: %i[show update]
  before_action :authenticate_user!

  def show
    if @organization && organization_owner?
      render json: @organization
    else
      head :not_found
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

  def set_organization
    @organization = Organization.find_by(id: params[:id])
  end

  def organization_owner?
    organization_id = @organization.id
    UserDecorator.new(current_user).organization_owner?(organization_id)
  end

  def organization_params
    params.require(:organization).permit(:name, :description)
  end
end
