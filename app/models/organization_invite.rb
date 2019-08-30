class OrganizationInvite < ApplicationRecord
  belongs_to :user
  belongs_to :user_organization
end
