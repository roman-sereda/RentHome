require 'test_helper'

class HostTest < ActiveSupport::TestCase

  def setup
    @host = build(:host)
  end

  test "host should be valid" do
    assert @host.valid?
  end

  test "name should be present" do
    @host.name = ""
    assert_not @host.valid?
  end

  test "surname should be present" do
    @host.surname = ""
    assert_not @host.valid?
  end

  test "city and country isn't essential" do
    @host.city = ""
    @host.country = ""
    assert @host.valid?
  end

end
