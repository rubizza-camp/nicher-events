require 'faker'

FactoryBot.define do

  factory :event do
    name { Faker::String.random(6) }
    description { Faker::String.random(20) }
    date { Faker::Date.between(2.days.ago, Date.today) }
    status { :social }
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
    description { Faker::String.random(20) }
    people_capacity { rand(99) }
  end

end
