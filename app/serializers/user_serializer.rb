class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :phone, :password, :role, :link_photo

  has_one :organization
end
