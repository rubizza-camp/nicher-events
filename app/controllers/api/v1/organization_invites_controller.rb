class Api::V1::OrganizationInvitesController < ApplicationController
  before_action :generate_token
  before_action :authenticate_user!

  def create
    @invite = OrganizationInvite.new(organization_invite_params)
    @invite.user = current_user
    if @invite.save
      OrganizationInviteMailer.new
    else
      head :not_found
    end
  end

  private

  def generate_token
  end

  def check_user_existence
    user = User.find_by(email: email)
    if user
      self.user_id = user.id
    end
  end

  def set_organization_invite_params
    params.require(:organization_invite).permit(:email, :token)
  end
end
