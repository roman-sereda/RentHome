require 'rails_helper'

RSpec.describe GuestsController, type: :controller do
  describe 'GET #show' do
    before(:each) do
      @guest = FactoryGirl.create(:guest)
      get :show, params: { id: @guest.id }
    end 

    it "return information about guest" do
      guest_response = JSON.parse(response.body, symbolize_names: true)
      expect(response).to be_success
      expect(guest_response[:guest][:email]).to eql @guest.email
    end

    it { should respond_with 200 }
  end

  describe "POST #create" do
    context "when is created successfully" do
      before(:each) do
        @guest_attributes = FactoryGirl.attributes_for :guest
        post :create, params: { guest: @guest_attributes }, format: :json
      end

      it "renders json representation for the guest record just created" do
        guest_response = JSON.parse(response.body, symbolize_names: true)
        expect(guest_response[:guest][:email]).to eql @guest_attributes[:email]
      end
      
      it { should respond_with 201 }
    end

    context "when is not created" do
      before(:each) do
        @invalid_guest_attributes = { name: "Ivan", surname: "", email: "asas@d" }
        post :create, params: { guest: @invalid_guest_attributes }, format: :json
      end 

      it "renders an errors in json" do
        guest_response = JSON.parse(response.body, symbolize_names: true)
        expect(guest_response).to have_key(:errors)       
      end

      it "renders errors 'Surname can't be blank'" do
        guest_response = JSON.parse(response.body, symbolize_names: true)
        expect(guest_response[:errors][:surname]).to include "can't be blank"
      end

      it "renders errors 'Password can't be blank'" do
        guest_response = JSON.parse(response.body, symbolize_names: true)
        expect(guest_response[:errors][:password]).to include "can't be blank"
      end

      it "renders errors 'Email is not an email'" do 
        guest_response = JSON.parse(response.body, symbolize_names: true)
        expect(guest_response[:errors][:email]).to include "is not an email"
      end

      it { should respond_with 422 }
    end
  end

  describe 'PUT/PATCH #update' do 
    context 'when is updated successfully' do
      before(:each) do
        @guest = FactoryGirl.create(:guest)
        patch :update,
          params: { id: @guest.id, 
                    guest: { email: 'newemail@example.com' } }, format: :json
      end

      it 'renders the json representation for the updated guest' do
        guest_response = JSON.parse(response.body, symbolize_names: true)
        expect(response).to be_success
        expect(guest_response[:guest][:email]).to eql 'newemail@example.com' 
      end

      it { should respond_with 200 }
    end    

    context 'when is not updated' do
      before(:each) do
        @guest = FactoryGirl.create(:guest)
        patch :update,
          params: { id: @guest.id, 
                    guest: { email: 'bademailexample.com' } }, format: :json
      end

      it 'renders an errors json' do
        guest_response = JSON.parse(response.body, symbolize_names: true)
        expect(guest_response).to have_key(:errors) 
      end

      it 'renders errors "Email is not an email"' do
        guest_response = JSON.parse(response.body, symbolize_names: true)
        expect(guest_response[:errors][:email]).to include "is not an email"
      end

      it { should respond_with 422 }
    end
  end

  describe 'DELETE #destroy' do
    before(:each) do
      @guest = FactoryGirl.create(:guest)
      delete :destroy, params: { id: @guest.id }, format: :json
    end

    it { should respond_with 204 }
  end
end
