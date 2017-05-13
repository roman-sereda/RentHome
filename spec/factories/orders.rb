FactoryGirl.define do
  factory :order do
    association :guest, factory: :guest
    association :house, factory: :house
    start_time Date.today
    end_time Date.tomorrow
    paid false
    total_price "9.99"
  end
end
