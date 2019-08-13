class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :date, :description, :status, :user_id

  def date
    Time.parse(object.date.to_s).strftime('%Y-%m-%dT%H:%M')
  end
end
