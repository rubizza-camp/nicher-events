# frozen_string_literal: true

class User < ActiveRecord::Base
<<<<<<< HEAD
  enum role: %i[attendee organizer]
  validates :role, inclusion: { in: %w[attendee organizer] }
=======
>>>>>>> Create user model
  # :trackable
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User
end
