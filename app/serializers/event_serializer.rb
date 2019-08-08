class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :date, :description, :status, :user_id

  def date
    Time.parse(object.date.to_s).strftime('%Y-%d-%mT%H:%M')
  end
end
