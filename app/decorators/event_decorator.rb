# :reek:NilCheck

class EventDecorator < Draper::Decorator
  delegate_all

  def already_subscribed_by_user?(user_id)
    attendances.find_by(user_id: user_id)&.id.present?
  end

  def editable?(user_id)
    organization.users.find_by(id: user_id).present?
  end
end
