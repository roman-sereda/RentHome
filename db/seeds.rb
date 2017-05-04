DatabaseCleaner.strategy = :truncation
DatabaseCleaner.clean

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
               conditioner: true,
               price_per_day: 13.37)
end

Guest.create(name: FFaker::Name.first_name, surname: FFaker::Name.last_name,
             email: FFaker::Internet.email, password: "password")
