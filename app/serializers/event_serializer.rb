# :reek:NilCheck

class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :date, :description, :status, :organization,
             :available_for_edit, :users, :attendance_id, :comments, :virtual_map_link, :venue

  def date
    Time.parse(object.date.to_s).strftime('%Y-%m-%dT%H:%M')
  end

  def available_for_edit
    object.decorate.editable?(current_user&.id)
  end

  def attendance_id
    object.decorate.already_subscribed_by_user?(current_user&.id) unless available_for_edit
  end

  def link_map
    object.event_layouts.take.link_map
  rescue NoMethodError
    '#'
  end
end
