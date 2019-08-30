FactoryBot.define do
  factory :event_invite do
    event_id {}
    user_id {}
    email { Faker::Internet.email }
    token { Faker::String.random }
    created_at { Faker::Time.between(from: Time.now - 1, to: Time.now, format: :default) }
    decline_at { nil }
    access_at { nil }
  end
end
