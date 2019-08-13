require 'faker'

20.times do |i|
	Venue.create({address: Faker::Address.full_address,
                description: Faker::Lorem.sentence,
                people_capacity: rand(1...99)})
end

puts 'Created 20 venues'

User.create([
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
    password: '123456',
    role: 1
  },

  {
    first_name: 'Dima',
    last_name: 'Kosikov',
    email: 'dima.kosikov01@mail.ru',
    phone: '+375291111111',
    password: '123456789',
    role: 1
  }
])

Organization.create([
  {
    name: 'ABC',
    description: 'The company "ABC" is a domestic Belarusian manufacturer of food products. Since 1995, we have
    been developing our production and directing our efforts to meeting the needs of people in quality and
    healthy products.

    Availability and openness:
    The consumer chooses those brands and those products that he trusts. His preferences, level of well-being, 
    pace of life and habits are changing, but the availability of ABC products on his desk has remained unchanged
    for many years.
    The choice by the buyer in the store of products from "ABC" is one of the most important, decisive factors 
    in the development and expansion of the assortment of manufactured goods. Their relevance and accessibility 
    in the trade network of the Republic of Belarus, as well as repeated victories at various consumer preferences 
    contests (Product of the Year, Choice of the Year, World Food, etc.) are a significant incentive for the 
    entire company team.'
  },
  {
    name: 'CyberGizer',
    description: 'At Cybergizer, we are nuts about code style and concepts of engineering excellence.
    We are empowering people and companies to unlock hidden potential, imagine, and invent their future with
    the help of new approaches and technologies.
    That’s how we bring product design and development to the next level.'
  }
])

UserOrganization.create([
  {
    user_id:1,
    organization_id:1
  },
  {
    user_id:2,
    organization_id:2
  }
users.each do |user|
  User.create(user)
end

events = Event.create([
  { name: 'First Event',
    date: '2019-08-10T11:10:25',
    description: 'here can be info about speekers, schedule etc.',
    status: :confidential,
    user_id:1
  },
  { name: 'Second Event',
    date: '2019-08-10T22:00:25',
    description: 'here can be info about speekers, schedule etc.',
    status: :social,
    user_id: 1
  },
  { name: 'Third Event',
    date: '2019-08-14T00:18:25',
    description: 'here can be info about speekers, schedule etc.',
    status: :social,
    user_id: 2
  }
])
