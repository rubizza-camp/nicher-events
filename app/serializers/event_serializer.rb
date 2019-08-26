# :reek:NilCheck
# rubocop:disable Metrics/LineLength

class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :date, :description, :status, :organization, :available_to_edit, :users, :available_to_subscribed, :attendance_id

  def date
    Time.parse(object.date.to_s).strftime('%Y-%m-%dT%H:%M')
  end

  def available_to_edit
    current_user&.available_to_edit_event?(object.id)
  end

  def available_to_subscribed
    current_user&.available_to_subscribe?(object.id)
  end

  def attendance_id
    object.decorate.already_subscribed_by_user?(current_user.id) if current_user&.available_to_subscribe?(object.id)
  end
end
# rubocop:enable Metrics/LineLength
