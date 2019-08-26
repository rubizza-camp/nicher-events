class Event < ApplicationRecord
  enum status: %i[social confidential]

  validates :name, presence: true, length: { maximum: 30 }
  validates :description, presence: true, length: { minimum: 10 }
  validates :date, presence: true
  validates :status, inclusion: { in: %w[social confidential] }

  belongs_to :user
  delegate :organization, to: :user, allow_nil: true

  has_many :attendances
  has_many :users, through: :attendances
  has_many :comments
end
