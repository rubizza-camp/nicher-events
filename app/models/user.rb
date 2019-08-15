# frozen_string_literal: true

class User < ActiveRecord::Base
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
end
