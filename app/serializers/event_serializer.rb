class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :date, :description, :status, :organization

  def date
    Time.parse(object.date.to_s).strftime('%Y-%m-%dT%H:%M')
  end
end
