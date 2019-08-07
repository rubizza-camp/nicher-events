class Event < ApplicationRecord
  enum status: %i[social confidential]

  validates :name, presence: true, length: { maximum: 30 }
  validates :description, presence: true, length: { minimum: 10 }
  validates :date, presence: true
  validates :status, inclusion: { in: %w[social confidential] }

  # belongs_to :user
end
