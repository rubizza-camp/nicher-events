FactoryBot.define do
  factory :venue do
    address { Faker::Address.full_address }
    description { Faker::String.random(length: 20) }
    people_capacity { rand(99) }
  end
end
