class VenueSerializer < ActiveModel::Serializer
  attributes :id, :address, :description, :people_capacity
end
