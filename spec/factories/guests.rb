FactoryGirl.define do
  factory :guest do
    name      "guestName"
    surname   "guestSurname"
    sequence(:email) {|n| "email#{n}@factory.com" }
    password  "password"
    city      "Zdolbuniv"
    country   "Ukraine"
  end
end
