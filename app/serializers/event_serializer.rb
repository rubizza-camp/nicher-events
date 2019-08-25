# :reek:NilCheck

class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :date, :description, :status, :organization, :available_to_edit, :users, :subscribed

  def date
    Time.parse(object.date.to_s).strftime('%Y-%m-%dT%H:%M')
  end

  def available_to_edit
    object.decorate.current_organization?(current_user.id) if current_user&.organizer?
  end

  def subscribed
    object.decorate.already_subscribed?(current_user.id) if current_user&.attendee?
  end
end
