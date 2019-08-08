require 'faker'

FactoryBot.define do
  factory :event do
    name { Faker::String.random(6) }
    description { Faker::String.random(20) }
    date { Faker::Date.between(2.days.ago, Date.today) }
    status { :social }
  end
  factory :user do
    email { Faker::Internet.email }
    password { Faker::Internet.password }
  end
end
