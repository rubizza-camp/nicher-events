require 'faker'
require 'factory_organization'

FactoryBot.define do
  factory :organization do
    name { Faker::Lorem.words(number: 10) }
    description { Faker::Lorem.words(number: 10) }
  end
end
