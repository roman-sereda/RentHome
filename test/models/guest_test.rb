require 'test_helper'

class GuestTest < ActiveSupport::TestCase

  def setup
    @guest= build(:guest)
  end

  test "guest hould be valid" do
    assert @guest.valid?
  end

  test "name should be present" do
    @guest.name = ""
    assert_not @guest.valid?
  end

  test "surname should be present" do
    @guest.surname = ""
    assert_not @guest.valid?
  end

  test "city and country isn't essential" do
    @guest.city = ""
    @guest.country = ""
    assert @guest.valid?
  end

end
