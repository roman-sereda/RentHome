FactoryGirl.define do
  factory :host do
    name      "host name"
    surname   "host surname"
    sequence(:email) {|n| "email#{n}@factory.com" }
    password  "password"
    city      "Rivne"
    country   "Ukraine"
    confirmed_at Time.now
  end
end
