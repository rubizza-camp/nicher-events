# frozen_string_literal: true

class User < ApplicationRecord
  # :trackable
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User
  enum role: %i[attendee organizer]
  validates :role, inclusion: { in: %w[attendee organizer] }
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :phone, presence: true, length: { minimum: 5 }

  has_one :user_organization, inverse_of: :user
  has_one :organization, through: :user_organization
  accepts_nested_attributes_for :user_organization
  accepts_nested_attributes_for :organization

  has_many :attendances
  has_many :events
  has_one_attached :photo
end
