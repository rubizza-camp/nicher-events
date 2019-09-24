#:reek:InstanceVariableAssumption because they are set in parent
class UserOrganizationAccessChecker < UserOrganizationChecker
  def call
    @user.organization_member?(@organization.id)
  end
end
