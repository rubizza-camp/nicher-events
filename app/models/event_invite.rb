class EventInvite < ApplicationRecord
  validates :email, presence: true
  belongs_to :user, -> { where(role: 'organizer') }
  belongs_to :event
end
