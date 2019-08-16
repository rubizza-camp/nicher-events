# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

users = [
  {
    first_name: 'Margo',
    last_name: 'Omelchuk',
    email: 'margosha20617@gmail.com',
    phone: '+375291111111',
    password: '123456',
    role: :attendee,
  },

  {
    first_name: 'Dima',
    last_name: 'Kosikov',
    email: 'dima.kosikov01@mail.ru',
    phone: '+375291111111',
    password: '123456789',
    role: :attendee,
  }
]

users.each do |user|
  User.create(user)
end 


organizer_params = User.create({
  first_name: Faker::Name.first_name,
  last_name: Faker::Name.last_name,
  email: Faker::Internet.email,
  phone: Faker::PhoneNumber.phone_number,
  password: Faker::Internet.password,
  role: :organizer,
})

User.last.events.create([
  { name: Faker::Lorem.word,
    date: Faker::Date.between(from: 2.days.ago, to: Date.today),
    description: Faker::Lorem.sentence,
    status: Event.statuses.keys.sample,
  },
  { name: Faker::Lorem.word,
    date: Faker::Date.between(from: 2.days.ago, to: Date.today),
    description: Faker::Lorem.sentence,
    status: Event.statuses.keys.sample,
  }
])
