# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
House.delete_all

9.times do |n|
  House.create(city: "city#{n}",
               floor: n,
               rooms: 2,
               rent_start: "2017-04-15",
               rent_end: "2017-05-0#{n}",
               parking: false, kitchen: true,
               animals_allowed: false,
               wi_fi: true,
               heating: true,
               conditioner: true)
end
