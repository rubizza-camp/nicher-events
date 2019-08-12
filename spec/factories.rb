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

  factory :venue do
    address { Faker::Address.full_address }
    description { Faker::String.random(length: 20) }
    people_capacity { rand(99) }
  end

  factory :event do
    name { Faker::Lorem.word }
    description { Faker::Lorem.sentence }
    date { Faker::Date.between(2.days.ago, Date.today) }
    status { Event.statuses.keys.sample }
  end
end
