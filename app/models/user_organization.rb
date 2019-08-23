class UserOrganization < ApplicationRecord
  belongs_to :user
  belongs_to :organization

  accepts_nested_attributes_for :organization
end
