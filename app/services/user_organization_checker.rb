class UserOrganizationChecker < ApplicationService
  def initialize(user, organization)
    @user = user
    @organization = organization
  end
end
