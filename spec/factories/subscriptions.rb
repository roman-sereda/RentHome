FactoryGirl.define do
  factory :subscription do
    end_time Date.today
    association :host, factory: :host
    email "MyString"
    card_token "MyString"
  end
end
