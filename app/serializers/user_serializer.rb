class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :phone, :password, :role

  has_one :organization, through: :user_organization
end
