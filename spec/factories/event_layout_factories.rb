FactoryBot.define do
  factory :event_layout do
    virtual_map { 'https://source.unsplash.com/random/600x600?map' }
    venue_id {}
    event_id {}
  end
end
