class UserOrganizationDestroyChecker < UserOrganizationChecker
  def initialize(user, current_user, organization)
    @organization = organization
    @user = user
    @current_user = current_user
  end

  def call
    @current_user.organization_member?(@organization.id) &&
      @current_user.id == @organization.owner_id && @user != @current_user
  end
end
