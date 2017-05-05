FactoryGirl.define do
  factory :guest do
    name      "guestName"
    surname   "guestSurname"
    email     "guest@example.com"
    password  "password"
    city      "Zdolbuniv"
    country   "Ukraine"
  end
end
