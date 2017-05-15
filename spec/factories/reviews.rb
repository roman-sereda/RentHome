FactoryGirl.define do
  factory :review do
    text "MyText"
    rating 1
    association :guest, factory: :guest
    association :house, factory: :house
  end
end
