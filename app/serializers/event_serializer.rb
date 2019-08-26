# :reek:NilCheck
# rubocop:disable Metrics/LineLength

class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :date, :description, :status, :organization, :available_to_edit, :users, :available_to_subscribed, :attendance_id, :comments

  def date
    Time.parse(object.date.to_s).strftime('%Y-%m-%dT%H:%M')
  end

  def available_to_edit
    current_user.available_to_edit_event?(object.id) if current_user&.organizer?
  end

  def available_to_subscribed
    current_user&.available_to_subscribe?(object.id)
  end

  def attendance_id
    object.decorate.attendance?(current_user.id) if current_user&.available_to_subscribe?(object.id)
  end
end
# rubocop:enable Metrics/LineLength
