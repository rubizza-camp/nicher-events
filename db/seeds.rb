require 'faker'

20.times do |i|
	Venue.create({address: Faker::Address.full_address,
                description: Faker::Lorem.sentence,
                people_capacity: rand(1...99)})
end

puts 'Created 20 venues'

users = [
  {
    first_name: 'Test',
    last_name: 'Testuser',
    email: 'test@test.com',
    phone: '+375291111111',
    password: 'testtest'
  },

  {
    first_name: 'Margo',
    last_name: 'Omelchuk',
    email: 'margosha20617@gmail.com',
    phone: '+375291111111',
    password: '123456'
  },

  {
    first_name: 'Dima',
    last_name: 'Kosikov',
    email: 'dima.kosikov01@mail.ru',
    phone: '+375291111111',
    password: '123456789'
  }
]

users.each do |user|
  User.create(user)
end
