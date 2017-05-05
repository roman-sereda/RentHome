require 'rails_helper'

RSpec.describe GuestsController, type: :controller do
  describe 'GET #show' do
    before(:each) do
      @guest = FactoryGirl.create(:guest)
      get :show, params: { id: @guest.id }, format: :json
    end 

    it "return information about guest" do
      guest_response = JSON.parse(response.body, symbolize_names: true)
      expect(guest_response[:guest][:email]).to eql @guest.email
    end

    it { should respond_with 200 }
  end
end
