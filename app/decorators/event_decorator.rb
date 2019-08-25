class EventDecorator < Draper::Decorator
  delegate_all

  def current_organization?(user_id)
    User.find(user_id).organization.events.find_by(id: id).present?
  end

  def already_subscribed?(user_id)
    users.find_by(id: user_id).present?
  end
end
