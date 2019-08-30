class EventLayout < ApplicationRecord
  has_one_attached :virtual_map
  belongs_to :venue
  belongs_to :event
end
