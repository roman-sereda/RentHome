DatabaseCleaner.strategy = :truncation
DatabaseCleaner.clean

10.times do |n|
  Guest.create(
  name: FFaker::Name.first_name + "_guest_#{n}",
  surname: FFaker::Name.last_name + "_guest_#{n}",
  email: FFaker::Internet.free_email("guest#{n}"),
  password: "password")
end

5.times do |n|
  host = Host.create(
  name: FFaker::Name.first_name + "host_#{n}",
  surname: FFaker::Name.last_name + "host_#{n}",
  email: FFaker::Internet.free_email("host#{n}") ,
  password: "password"
  )
  10.times do |n|
    host.houses.create(
      city: "city#{n}",
      floor: n,
      rooms: 2,
      rent_start: Date.today,
      rent_end: Date.tomorrow,
      parking: false, kitchen: true,
      animals_allowed: false,
      wi_fi: true,
      heating: true,
      conditioner: true,
      price_per_day: 13.37 * n,
      price_per_month: 22.8 * n
      )
  end
end

Host.first.subscription.create(
  card_token: 1337,
  email: FFaker::Internet.free_email,
  end_time: Date.today.next_month
)
