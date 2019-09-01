class Organization < ApplicationRecord
  validates :name, :description, presence: true
  validates :name, uniqueness: true
  validates :name, length: { minimum: 2 }
  validates :description, length: { maximum: 5000 }
  # validates :owner_id, uniqueness: true

  has_many :user_organizations
  has_many :users, -> { where(role: 'organizer') }, through: :user_organizations

  has_many :events, through: :users
end
