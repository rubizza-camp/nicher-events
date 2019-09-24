class OrganizationSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :owner_id

  has_many :events
end
