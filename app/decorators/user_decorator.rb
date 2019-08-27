class UserDecorator < Draper::Decorator
  delegate_all

  def organization_member?(id)
    organizer? && id == organization.id
  end
end
