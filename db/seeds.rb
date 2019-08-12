require 'faker'

20.times do |i|
	Venue.create({address: Faker::Address.full_address,
                description: Faker::Lorem.sentence,
                people_capacity: rand(1...99)})
end

puts 'Created 20 venues'