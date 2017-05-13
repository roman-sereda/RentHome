FactoryGirl.define do
  factory :subscription do
    end_time "2017-05-12"
    association :host, factory: :host
    email "MyString"
    card_token "MyString"
  end
end
