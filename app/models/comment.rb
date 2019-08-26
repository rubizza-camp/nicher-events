class Comment < ApplicationRecord
  validates :text, presence: true
  validates :rating, presence: true

  belongs_to :user
end
