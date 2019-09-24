class Organization < ApplicationRecord
  include Swagger::Blocks

  validates :name, :description, presence: true
  validates :name, uniqueness: true
  validates :name, length: { minimum: 2 }
  validates :description, length: { maximum: 2000 }
  # validates :owner_id, uniqueness: true

  has_many :user_organizations
  has_many :users, -> { where(role: 'organizer') }, through: :user_organizations

  has_many :events, through: :users

  swagger_schema :Organization do
    allOf do
      schema do
        key :'$ref', :OrganizationInput
      end
      schema do
        property :id do
          key :type, :integer
          key :required, true
          key :description, 'Id of organization'
          key :example, 1
        end
      end
    end
  end
  swagger_schema :OrganizationInput do
    property :name do
      key :type, :string
      key :required, true
      key :description, 'Name of organization'
      key :example, 'Cybergizer'
    end
    property :description do
      key :type, :string
      key :required, true
      key :description, 'What organization does'
      key :example, 'Vestibulum hendrerit rutrum arcu, ac.'
    end
  end
end
