FactoryBot.define do
  factory :venue do
    name { Faker::Cannabis.brand }
    address { Faker::Address.full_address }
    description { Faker::Lorem.sentence }
    people_capacity { rand(99) }
  end
end
