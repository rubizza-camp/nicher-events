# frozen_string_literal: true

class EventObject < ActiveRecord::Base
  validates :name, presence: true, length: { maximum: 30 }
  validates :description, presence: true, length: { minimum: 10 }
  validates :location, presence: true

  has_one_attached :file
end