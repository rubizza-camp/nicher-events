#:reek:InstanceVariableAssumption because they are set in parent
class UserOrganizationDestroyChecker < UserOrganizationChecker
  def call
    @user.organization_member?(@organization.id) && @user.id == @organization.owner_id
  end
end
