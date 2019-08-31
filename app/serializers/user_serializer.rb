class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :phone, :password, :role, :link_photo

  class OrganizationSerializer < ActiveModel::Serializer
    attributes :id, :name, :description
  end

  has_one :organization
end
