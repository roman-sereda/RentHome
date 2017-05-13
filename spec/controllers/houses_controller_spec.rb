require "rails_helper"

RSpec.describe HousesController, type: :controller do
  include Devise::Test::ControllerHelpers

  let(:host) { create :host }
  let(:wrong_house) { create :house }
  let(:proper_house) { create :house, host: host }
  let(:house_count) { House.count }
  let(:subscription) { create :subscription, host: host }
  let(:max_free_houses) do
    5.times do |n|
      create :house, host: host
    end
  end

  describe "GET #show" do
    before do
      expect(proper_house.impressionist_count(:filter=>:ip_address)).to eql 0
      get :show, params: { id: proper_house.id }
    end

    it "returns house data" do
      expect(json_response[:house][:city]).to eql proper_house.city
    end

    it "counts unique ip" do
      expect(proper_house.impressionist_count(:filter=>:ip_address)).to eql 1
    end

    it { should respond_with 200 }
  end

  describe "POST #create" do
    context "when host is authentificated" do
      before do
        sign_in host, scope: :host
      end

      context "when host is subscribed" do
        before do
          subscription
          max_free_houses
        end

        context "when is created successfully" do
          before do
            house_count
            post :create, params: { house: attributes_for(:house) }
          end

          it { should respond_with 201 }

          it "creates new house" do
            expect(House.count).to eql house_count + 1
          end

          it "returns new house" do
            expect(json_response[:house][:city]).to eql House.last.city
          end
        end

        context "when is not created" do
          before do
            post :create, params: { house: attributes_for(:house, city: nil) }
          end

          it { should respond_with 422 }

          it "returns errors" do
            expect(json_response[:errors]).to be_truthy
          end
        end
      end

      context "when host is not subscribed" do
        before do
          max_free_houses
          post :create, params: { house: attributes_for(:house) }
        end

        it { should respond_with :unprocessable_entity }

        it "returns errors" do
          expect(json_response[:errors]).to be_truthy
        end
      end
    end

    context "when host is not authentificated" do
      before do
        post :create, params: { house: attributes_for(:house) }
      end

      it { should respond_with 401}
    end
  end

  describe "PATCH #update" do
    context "when host is authentificated" do
      before do
        sign_in host, scope: :host
      end

      context "when updating proper house" do
        context "when is updated successfully" do
          before do
            patch :update, params: { id: proper_house.id,
              house: attributes_for(:house, city: "New city") }
          end

          it { should respond_with 200 }

          it "returns updated house" do
            expect(json_response[:house][:id]).to eql proper_house.id
          end
        end

        context "when is not updated" do
          before do
            patch :update, params: { id: proper_house.id,
              house: attributes_for(:house, city: nil) }
          end

          it { should respond_with 422 }

          it "returns errors" do
            expect(json_response).to have_key(:errors)
          end
        end
      end

      context "when try to update wront house" do
        it "returns authentication errors" do
          patch :update, params: { id: create(:house).id,
            house: attributes_for(:house, city: nil)}
          should respond_with 401
        end
      end
    end
  end

  describe "#DELETE #destroy" do
    before do
      sign_in host, scope: :host
    end

    context "when associated host is authentificated" do
      before do
        proper_house
        house_count
        delete :destroy, params: { id: proper_house.id }
        house_count
      end

      it { should respond_with 204 }

      it "deletes house" do
        expect(House.count).to eql house_count - 1
      end
    end

    context "when wrong host is authentificated" do
      before do
        delete :destroy, params: { id: wrong_house.id }
      end

      it { should respond_with 401 }
    end
  end

  describe "GET #search" do
    let(:houses) do
      create(:house)
      create(:house, city: "new city")
      create(:house, city: "new city", wi_fi: false)
    end

    context "when filter is provided" do
      before do
        houses
        get :search, params: { page: 1,
          filters: { city: "new city", wi_fi: false }}
      end

      it { should respond_with 200 }

      it 'returns array of filtered houses' do
        expect(json_response[:houses].count).to eql 1
      end
    end

    context "when filter is not provided" do
      before do
        create(:house)
        create(:house, city: "new city")
        create(:house, city: "new city", wi_fi: false)
        get :search, params: { page: 1 }
      end

      it { should respond_with 200 }

      it 'returns array of filtered houses' do
        expect(json_response[:houses].count).to eql 3
      end
    end
  end
end
