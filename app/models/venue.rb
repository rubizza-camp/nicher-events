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
  # belongs_to :event_layout
  validates :address,
            presence: true,
            length: { minimum: 5 },
            uniqueness: true
end
