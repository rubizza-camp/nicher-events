class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :phone, :password, :role, :organization, :events

  has_one :organization
end
