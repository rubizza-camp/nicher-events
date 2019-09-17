#:reek:InstanceVariableAssumption
#:reek:TooManyInstanceVariables
class Api::V1::UserOrganizationsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_current_user_organization, only: %i[index]
  before_action :set_user_organization, only: %i[destroy]
  before_action :set_organization, only: %i[destroy]
  before_action :set_user, only: %i[destroy]

  def destroy
    if current_user.organization_member?(@organization.id) && current_user.id == @organization.owner_id
      unless @user == current_user
        @user_organization.destroy
        head :no_content
      end
    else
      head :forbidden
    end
  end

  def index
    if current_user.organization_member?(@current_user_organization.id)
      @user_organizations = UserOrganization.all.where(organization_id: @current_user_organization.id)
      render json: @user_organizations
    else
      head :not_found
    end
  end

  private

  def set_user
    @user = @user_organization.user
  end

  def set_organization
    @organization = @user_organization.organization
  end

  def set_current_user_organization
    @current_user_organization = current_user.organization
  end

  def set_user_organization
    @user_organization = UserOrganization.find(params[:id])
  end

  def user_organization_params
    params.require(:user_organization).permit(:user_id, :organization_id)
  end
end
