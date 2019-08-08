# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
events = Event.create([
    {name: 'First Event', date: '2019-08-10T11:10:25', description:'here can be info about speekers, schedule etc.', status: :confidential, user_id:1},
    {name: 'Second Event', date: '2019-08-10T22:00:25', description:'here can be info about speekers, schedule etc.', status: :social, user_id:1}
])
organizations = [
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
]

organizations.each do |organization|
  Organization.create!(organization)
end

users = [
    { email: 'user@gmail.com', password: '123456' }
]

User.create(users)
