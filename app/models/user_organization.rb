class UserOrganization < ApplicationRecord
  belongs_to :user
  belongs_to :organization
  has_many :invites

  accepts_nested_attributes_for :organization
end
