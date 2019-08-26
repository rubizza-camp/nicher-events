class UserDecorator < Draper::Decorator
  delegate_all

  def organization_member?(id)
    organizer? && id == organization.id
  end

  def available_to_edit_event?(id)
    organization.events.find_by(id: id).present?
  end

  def available_to_subscribe?(id)
    attendee? || (organizer? && organization.events.find_by(id: id).blank?)
  end
end
