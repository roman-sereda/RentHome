require 'test_helper'

class HouseTest < ActiveSupport::TestCase

  test "some house attributes must not be empty" do
    house = House.new
    assert house.invalid?
    assert house.errors[:floor].any?
    assert house.errors[:rent_start].any?
    assert house.errors[:rent_end].any?
    assert house.errors[:rooms].any?
    assert house.errors[:city].any?
  end

  test "floor should be a non negative number" do
    house = build(:house, floor: -1)
    assert house.invalid?
    assert house.errors[:floor].any?
  end

  test "rooms should be positive number" do
    house = build(:house, rooms: 0)
    assert house.invalid?
    assert house.errors[:rooms].any?
  end

  test "rent_end should be later than rent_start" do
    house = build(:house, rent_start: "2017-05-04", rent_end: "2017-05-03")
    assert house.invalid?
    assert house.errors[:rent_start].any?
    assert house.errors[:rent_end].any?
  end

  test "house with valid rent period should be valid" do
    house = build(:house, rent_start: "2017-05-04", rent_end: "2017-05-05")
    assert house.valid?
  end

  test "price should be positive if it`s present" do
    house = build(:house, price_per_day: -1, price_per_month: -1)
    assert house.invalid?
    assert house.errors[:price_per_day].any?
    assert house.errors[:price_per_month].any?
  end

  test "At least 1 price should be present" do
    house = build(:house,  price_per_day: nil, price_per_month: nil)
    assert house.invalid?
    error_message = ["should be at least one price"]
    assert_equal error_message, house.errors[:price_per_month]
    assert_equal error_message, house.errors[:price_per_day]
  end

end
