class VenueSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :description, :people_capacity
end
