class EventInvite < ApplicationRecord
  include Swagger::Blocks

  validates :email, presence: true

  belongs_to :user, -> { where(role: 'organizer') }
  belongs_to :event

  swagger_schema :EventInviteInput do
    property :email do
      key :type, :string
      key :required, true
      key :description, 'E-mail of invited person'
      key :example, 'user@example.com'
    end
  end
  swagger_schema :EventInvite do
    property :event do
      key :type, :object
      key :'$ref', :Event
    end
    property :id do
      key :type, :int
      key :required, true
      key :description, 'Id of invite'
      key :example, '1'
    end
  end
end
