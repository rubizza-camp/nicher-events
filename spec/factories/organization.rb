require 'faker'

FactoryBot.define do
  factory :organization do
    name { Faker::String.random(length: 3) }
    description { Faker::String.random(length: 20) }
  end
end
