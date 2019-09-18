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

  scope :social, -> { where(status: :social) }
  scope :confidential, -> { where(status: :confidential) }
  scope :available_for_user, ->(user_id) { joins(:attendances).where(attendances: { user_id: user_id }) }

  has_many :event_layouts
  has_many :venues, through: :event_layouts

  accepts_nested_attributes_for :event_layouts, allow_destroy: true, reject_if: :all_blank
end
