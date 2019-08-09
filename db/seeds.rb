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
