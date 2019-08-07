class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :date, :description, :status, :user_id
end
