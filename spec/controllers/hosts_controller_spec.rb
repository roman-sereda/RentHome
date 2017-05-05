require 'rails_helper'

RSpec.describe HostsController, type: :controller do
  describe 'GET #show' do
    before(:each) do
      @host = FactoryGirl.create(:host)
      get :show, params: { id: @host.id }
    end 

    it "return information about host" do
      host_response = json_response
      expect(response).to be_success
      expect(host_response[:host][:email]).to eql @host.email
    end

    it { should respond_with 200 }
  end

  describe "POST #create" do
    context "when is created successfully" do
      before(:each) do
        @host_attributes = FactoryGirl.attributes_for(:host)
        post :create, params: { host: @host_attributes }, format: :json
      end

      it "renders json representation for the host record just created" do
        host_response = json_response
        expect(host_response[:host][:email]).to eql @host_attributes[:email]
      end
      
      it { should respond_with 201 }
    end

    context "when is not created" do
      before(:each) do
        @invalid_host_attributes = { name: "Ivan", surname: "", email: "asas@d" }
        post :create, params: { host: @invalid_host_attributes }, format: :json
      end 

      it "renders an errors in json" do
        host_response = json_response
        expect(host_response).to have_key(:errors)       
      end

      it "renders errors 'Surname can't be blank'" do
        host_response = json_response
        expect(host_response[:errors][:surname]).to include "can't be blank"
      end

      it "renders errors 'Password can't be blank'" do
        host_response = json_response
        expect(host_response[:errors][:password]).to include "can't be blank"
      end

      it "renders errors 'Email is not an email'" do 
        host_response = json_response
        expect(host_response[:errors][:email]).to include "is not an email"
      end

      it { should respond_with 422 }
    end
  end

  describe 'PUT/PATCH #update' do 
    context 'when is updated successfully' do
      before(:each) do
        @host = FactoryGirl.create(:host)
        patch :update,
          params: { id: @host.id, 
                    host: { email: 'newemail@example.com' } }, format: :json
      end

      it 'renders the json representation for the updated host' do
        host_response = json_response
        expect(response).to be_success
        expect(host_response[:host][:email]).to eql 'newemail@example.com' 
      end

      it { should respond_with 200 }
    end    

    context 'when is not updated' do
      before(:each) do
        @host = FactoryGirl.create(:host)
        patch :update,
          params: { id: @host.id, 
                    host: { email: 'bademailexample.com' } }, format: :json
      end

      it 'renders an errors json' do
        host_response = json_response
        expect(host_response).to have_key(:errors) 
      end

      it 'renders errors "Email is not an email"' do
        host_response = json_response
        expect(host_response[:errors][:email]).to include "is not an email"
      end

      it { should respond_with 422 }
    end
  end

  describe 'DELETE #destroy' do
    before(:each) do
      @host = FactoryGirl.create(:host)
      delete :destroy, params: { id: @host.id }, format: :json
    end

    it { should respond_with 204 }
  end
end
