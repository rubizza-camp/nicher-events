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
      key :example, 1
    end
    property :name do
      key :type, :string
      key :example, 'Cybergizer'
    end
    property :address do
      key :type, :string
      key :example, 'Masherova street, MINSK'
    end
    property :description do
      key :type, :string
      key :example, 'good places for your event'
    end
    property :people_capacity do
      key :type, :integer
      key :example, 20
    end
  end

  swagger_schema :VenueInput do
    property :name do
      key :type, :string
      key :example, 'Cybergizer'
    end
    property :address do
      key :type, :string
      key :example, 'Masherova street, MINSK'
    end
    property :description do
      key :type, :string
      key :example, 'good places for your event'
    end
    property :people_capacity do
      key :type, :integer
      key :example, 20
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
