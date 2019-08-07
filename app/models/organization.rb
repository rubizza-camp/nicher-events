class Organization < ApplicationRecord
  validates :name, :description, presence: true
  validates :name, uniqueness: true

  #has_many :user
end
