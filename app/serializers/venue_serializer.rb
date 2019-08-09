# == Schema Information
#
# Table name: venues
#
#  id              :bigint           not null, primary key
#  address         :string           not null
#  description     :text             default("")
#  people_capacity :integer          default(0)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class VenueSerializer < ActiveModel::Serializer
  attributes :id, :address, :description, :people_capacity
end
