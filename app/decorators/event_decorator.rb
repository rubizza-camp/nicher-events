class EventDecorator < Draper::Decorator
  delegate_all

  def already_subscribed?(user_id)
    users.find_by(id: user_id).present?
  end
end
