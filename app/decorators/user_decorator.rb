class UserDecorator < Draper::Decorator
  delegate_all

  def organization_member?(id)
    organizer? && id == organization.id
  end

  def current_event_organizer?(event_id)
    organizer? && organization.events.find_by(id: event_id)
  end
end
