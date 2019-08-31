FactoryBot.define do
  factory :event_object do
    name { Faker::Lorem.words }
    description { Faker::Lorem.sentence }
    location { Faker::Lorem.words }
  end
end
