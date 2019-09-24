FactoryBot.define do
  factory :event do
    name { Faker::Lorem.word }
    description { Faker::Lorem.sentence }
    date { Faker::Date.between(from: 2.days.ago, to: 2.days.from_now) }
    status { Event.statuses.keys.sample }
  end
end
