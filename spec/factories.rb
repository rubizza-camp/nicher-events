require 'faker'

FactoryBot.define do
  factory :user do
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    email { Faker::Internet.email }
    phone { Faker::PhoneNumber.phone_number }
    password { Faker::Internet.password }
  end

  factory :event do
    name { Faker::Lorem.word }
    description { Faker::Lorem.sentence }
    date { Faker::Date.between(from: 2.days.ago, to: Date.today) }
    status { Event.statuses.keys.sample }
    user_id { Faker::Number.number(digits: 10) }
  end
end
