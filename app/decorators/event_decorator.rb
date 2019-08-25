class EventDecorator < Draper::Decorator
  delegate_all

  def current_organization?(user_id)
    User.find(user_id).organization.events.find_by(id: id).present?
  end
end
