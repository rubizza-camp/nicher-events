require 'faker'

FactoryBot.define do
  factory :organization do
    name { Faker::Lorem.words(number: 10) }
    description { Faker::Lorem.words(number: 10) }
  end

  factory :user do
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    email { Faker::Internet.email }
    phone { Faker::PhoneNumber.phone_number }
    password { Faker::Internet.password }
  end
end
