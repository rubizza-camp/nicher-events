class UserDecorator < SimpleDelegator
  def organization_owner?(id)
    organizer? && id == organization[:id]
  end
end
