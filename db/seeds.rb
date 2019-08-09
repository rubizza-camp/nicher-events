# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
users = [
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
