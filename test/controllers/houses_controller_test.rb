require "test_helper"
require "json"

class HousesControllerTest < ActionController::TestCase
  include FactoryGirl::Syntax::Methods

  test "should return house data" do
    house = create(:house)
    get :show, params: { id: house.id }
    assert_response 200

    jdata = JSON.parse response.body
    assert_equal house.city, jdata["house"]["city"]
  end

  test "should create house if requesting with valid data" do
    assert_difference("House.count") do
      post :create, params: { house: attributes_for(:house) }
      assert_response 201
    end

    jdata = JSON.parse response.body
    assert_equal House.last.id, jdata["house"]["id"]
  end

  test "should return house errors if requesting create with invalid data" do
    post :create, params: { house: attributes_for(:house, floor: -1) }
    assert_response 422
    jdata = JSON.parse response.body
    errors = {"floor"=>["must be greater than or equal to 0"]}
    assert_equal errors, jdata["errors"]
  end

  test "should update house if requesting with valid data" do
    house = create(:house)
    patch :update, params: { id: house.id, house: attributes_for(:house, city: "New city") }
    assert_response 200

    jdata = JSON.parse response.body
    assert_equal house.id, jdata["house"]["id"]
  end

  test "should return house errors if requesting update with invalid data" do
    house = create(:house)
    patch :update, params: { id: house.id, house: attributes_for(:house, city: "") }
    assert_response 422

    jdata = JSON.parse response.body
    errors = {"city"=>["can't be blank"]}
    assert_equal errors, jdata["errors"]
  end

  test "should destroy house" do
    house = create(:house)
    assert_difference("House.count", -1) do
      delete :destroy, params: { id: house.id }
    end

    assert_response 204
  end

  test "should return error if provided wrong id" do
    house = create(:house)
    delete :destroy, params: { id: "not id" }
    assert_response 422

    jdata = JSON.parse response.body
    errors = { "id" => ["Wrong house ID provided"] }
    assert_equal errors, jdata["errors"]
  end

  test "should return filtered houses if provided filters" do
    create(:house)
    create(:house, city: "new city")
    house = create(:house, city: "new city", wi_fi: false)
    get :search, params: { page: 1, filters: {
                                      city: "new city",
                                      wi_fi: false
                                    }}
    assert_response 200

    jdata = JSON.parse response.body
    assert_equal 1, jdata["houses"].count
  end

  test "should return houses if not provided filters" do
    create(:house)
    create(:house, city: "new city")
    house = create(:house, city: "new city", wi_fi: false)
    get :search, params: { page: 1, filters: {}}
    assert_response 200

    jdata = JSON.parse response.body
    assert_equal 3, jdata["houses"].count
  end
end
