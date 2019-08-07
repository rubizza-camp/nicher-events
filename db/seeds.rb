# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

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

events = Event.create([
    {name: 'First Event', date: '2019-08-10 11:10:25-07', description:'here can be info about speekers, schedule etc.', status: :confidential, user_id:1},
    {name: 'Second Event', date: '2019-08-10 22:00:25-07', description:'here can be info about speekers, schedule etc.', status: :social, user_id:1}
])
