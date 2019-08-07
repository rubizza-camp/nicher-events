class Event < ApplicationRecord
  enum status: %i[common secret]

  validates :name, presence: true, length: { maximum: 30 }
  validates :description, presence: true, length: { minimum: 10 }
  validates :date, presence: true
  validates :status, inclusion: { in: %w[common secret] }

  # belongs_to :user
end
