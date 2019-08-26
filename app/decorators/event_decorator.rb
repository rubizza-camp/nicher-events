# :reek:NilCheck

class EventDecorator < Draper::Decorator
  delegate_all

  def already_subscribed_by_user?(user_id)
    attendances.find_by(user_id: user_id)&.id
  end
end
