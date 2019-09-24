class UserOrganizationSerializer < ActiveModel::Serializer
  attributes :id, :organization_id

  belongs_to :user
end
