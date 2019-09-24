# == Schema Information
#
# Table name: venues
#
#  id              :bigint           not null, primary key
#  address         :string           default(""), not null
#  description     :text             default("")
#  people_capacity :integer          default(0)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class Venue < ApplicationRecord
  include Swagger::Blocks

  swagger_schema :Venue do
    property :id do
      key :type, :integer
    end
    property :address do
      key :type, :string
    end
    property :description do
      key :type, :string
    end
    property :people_capacity do
      key :type, :integer
    end
  end

  swagger_schema :VenueInput do
    allOf do
      schema do
        key :'$ref', :Venue
      end
      schema do
        key :required, [:name]
        property :name do
          key :type, :string
        end
      end
    end
  end

  # belongs_to :event_layout
  default_scope { order(created_at: :desc) }
  validates :address,
            presence: true,
            length: { minimum: 5 },
            uniqueness: true
  validates :name, presence: true
end
