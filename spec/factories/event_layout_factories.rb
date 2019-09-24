FactoryBot.define do
  factory :event_layout do
    venue_id {}
    event_id {}
    virtual_map_link { 'https://source.unsplash.com/random/600x600?map' }
    after(:build) do |event_object|
      event_object.virtual_map.attach(io: File.open(Rails.root.join('spec', 'fixtures', 'test_avatar.jpg')),
                                      filename: 'test_avatar.jpg', content_type: 'image/jpeg')
    end
  end
end
