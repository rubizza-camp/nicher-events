class Event < ApplicationRecord
  include Swagger::Blocks
  enum status: %i[social confidential]

  validates :name, presence: true, length: { maximum: 30 }
  validates :description, presence: true, length: { minimum: 10 }
  validates :date, presence: true
  validates :status, inclusion: { in: %w[social confidential] }

  belongs_to :user
  delegate :organization, to: :user, allow_nil: true

  has_many :attendances
  has_many :users, through: :attendances

  swagger_schema :Event do
    property :id do
      key :type, :integer
    end
    property :name do
      key :type, :string
    end
    property :date do
      key :type, :string
    end
    property :description do
      key :type, :string
    end
    property :status do
      key :type, :string
    end
    property :organization do
      key :type, :object
    end
    property :available_for_edit do
      key :type, :boolean
    end
    property :users do
      key :type, :array
      items do
        key :type, :object
      end
    end
    property :attendance_id do
      key :type, :boolean
    end
  end

  scope :social, -> { where(status: :social) }
  scope :confidential, -> { where(status: :confidential) }
  scope :available_for_user, ->(user_id) { joins(:attendances).where(attendances: { user_id: user_id }) }
end
