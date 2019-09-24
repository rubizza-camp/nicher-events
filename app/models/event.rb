# rubocop:disable Metrics/BlockLength
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

  swagger_schema :EventInput do
    property :name do
      key :type, :string
      key :required, true
      key :description, 'Name of event'
      key :example, 'Ruby conference'
    end
    property :date do
      key :type, :string
      key :required, true
      key :description, 'Date of event'
      key :example, '2019-09-18T00:00'
    end
    property :description do
      key :type, :string
      key :required, true
      key :description, 'Description of event'
      key :example, 'Quos rerum non at.'
    end
    property :status do
      key :type, :string
      key :required, true
      key :description, 'Type of event'
      key :enum, %w[social confidential]
    end
  end

  swagger_schema :Event do
    property :id do
      key :type, :integer
      key :description, 'Id of event'
      key :example, 1
    end
    property :name do
      key :type, :string
      key :description, 'Name of event'
      key :example, 'Ruby meetup'
    end
    property :date do
      key :type, :string
      key :description, 'Date of event'
      key :example, '2019-09-18T00:00'
    end
    property :description do
      key :type, :string
      key :description, 'Description of event'
      key :example, 'Omnis quis accusantium labore.'
    end
    property :status do
      key :type, :string
      key :description, 'Type of event'
      key :enum, %w[social confidential]
    end
    property :organization do
      key :type, :object
      key :'$ref', :Organization
      key :description, 'Host of event'
    end
    property :available_for_edit do
      key :description, 'Whether can be edited by current user'
      key :type, :boolean
    end
    property :users do
      key :type, :array
      key :description, 'Participants of event'
      items do
        key :type, :object
      end
    end
    property :attendance_id do
      key :type, :boolean
      key :description, 'Can user enter the event(false if already entered)'
    end
  end

  scope :social, -> { where(status: :social) }
  scope :confidential, -> { where(status: :confidential) }
  scope :available_for_user, ->(user_id) { joins(:attendances).where(attendances: { user_id: user_id }) }
end
# rubocop:enable Metrics/BlockLength
