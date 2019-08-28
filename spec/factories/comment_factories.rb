FactoryBot.define do
  factory :comment do
    text { Faker::Lorem.sentence }
    rating { Faker::Number.between(from: 1, to: 5) }
  end
end
