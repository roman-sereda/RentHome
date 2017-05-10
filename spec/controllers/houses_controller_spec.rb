require "rails_helper"

RSpec.describe HousesController, type: :controller do
  describe "GET #show" do
    before(:each) do
      @house = create(:house)
      expect(@house.impressionist_count(:filter=>:ip_address)).to eql 0
      get :show, params: { id: @house.id }
    end

    it "should return house data" do
      expect(json_response[:house][:city]).to eql @house.city
    end

    it "should count unique ip" do
      expect(@house.impressionist_count(:filter=>:ip_address)).to eql 1
    end

    it { should respond_with 200 }

  end

  describe "POST #create" do

    context "when is created successfully" do
      before(:each) do
        @house_count = House.count
        post :create, params: { house: attributes_for(:house) }
      end

      it { should respond_with 201 }

      it "should create new house" do
        expect(House.count).to eql @house_count + 1
      end

      it "should return new house" do
        expect(json_response[:house][:city]).to eql House.last.city
      end

    end

    context "when is not created" do
      before(:each) do
        post :create, params: { house: attributes_for(:house, city: nil) }
      end

      it { should respond_with 422 }

      it "should return errors" do
        expect(json_response).to have_key(:errors)
      end

    end
  end

  describe "PATCH #update" do

    context "when is updated successfully" do
      before(:each) do
        @house = create(:house)
        patch :update, params: { id: @house.id, house: attributes_for(:house, city: "New city") }
      end

      it { should respond_with 200 }

      it "should return updated house" do
        expect(json_response[:house][:id]).to eql @house.id
      end

    end

    context "when is not updated" do
      before(:each) do
        @house = create(:house)
        patch :update, params: { id: @house.id, house: attributes_for(:house, city: nil) }
      end

      it { should respond_with 422 }

      it "should return errors" do
        expect(json_response).to have_key(:errors)
      end
    end
  end

  describe "#DELETE #destroy" do
    before(:each) do
      @house = create(:house)
      @house_count = House.count
      delete :destroy, params: { id: @house.id }
    end

    it { should respond_with 204 }

    it "should delete house" do
      expect(House.count).to eql @house_count - 1
    end

  end

  describe "GET #search" do

    context "when filter is provided" do
      before(:each) do
        create(:house)
        create(:house, city: "new city")
        create(:house, city: "new city", wi_fi: false)
        get :search, params: { page: 1, filters: {
                                          city: "new city",
                                          wi_fi: false
                                        }}
      end

      it { should respond_with 200 }

      it 'should return array of filtered houses' do
        expect(json_response[:houses].count).to eql 1
      end

    end

    context "when filter is not provided" do
      before(:each) do
        create(:house)
        create(:house, city: "new city")
        create(:house, city: "new city", wi_fi: false)
        get :search, params: { page: 1 }
      end

      it { should respond_with 200 }

      it 'should return array of filtered houses' do
        expect(json_response[:houses].count).to eql 3
      end
    end
  end
end
