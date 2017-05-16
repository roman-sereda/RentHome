FactoryGirl.define do
  factory :house do
    title "house"
    type_of_building 1
    address "address"
    sleep_places 1
    total_area 10
    apartment_number 13
    floor 1
    parking true
    kitchen true
    heating true
    conditioner true
    animals_allowed true
    wi_fi true
    rent_start "2017-05-04"
    rent_end "2017-05-04"
    rooms 1
    city "MyString"
    price_per_day 13.37
    price_per_month 148.8
    association :host, factory: :host
  end
end
