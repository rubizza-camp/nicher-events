FactoryBot.define do
  factory :event_object do
    name { Faker::Lorem.words(number: 1) }
    description { Faker::Lorem.sentence }
    location { Faker::Lorem.words }
    after(:build) do |event_object|
      event_object.file.attach(io: File.open(Rails.root.join('spec', 'fixtures', 'test_avatar.jpg')),
                               filename: 'test_avatar.jpg', content_type: 'image/jpeg')
    end
  end
end
