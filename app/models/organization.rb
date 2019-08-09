class Organization < ApplicationRecord
  validates :name, :description, presence: true
  validates :name, uniqueness: true
  validates :name, length: { minimum:2 }
  validates :description, length: { maximum: 666 }
end
