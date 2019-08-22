# :reek:InstanceVariableAssumption
class Api::V1::OrganizationsController < ApplicationController
  before_action :set_organization, only: %i[show update]
  before_action :authenticate_user!

  def show
    if @organization && current_user.decorate.organization_member?(@organization.id)
      render json: @organization
    else
      head :not_found
    end
  end

  def update
    return head :unauthorized unless current_user.decorate.organization_member?(@organization.id)

    if @organization.update(organization_params)
      render json: @organization
    else
      render json: @organization.errors.full_messages, status: :unprocessable_entity
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
