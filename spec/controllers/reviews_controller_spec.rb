require "rails_helper"

RSpec.describe ReviewsController, type: :controller do
  include Devise::Test::ControllerHelpers
  let(:guest) { create :guest, confirmed_at: Date.today }
  let(:house) { create :house }
  let(:reviews) do
    10.times do |n|
      create :order, guest: guest, house: house, start_time: Date.today + n.days,
        end_time: Date.today + n.days
      create :review, house: house, guest: guest
    end
  end

  describe "GET #index" do
    before do
      reviews
      get :index, params: { page: 1, house_id: house.id, }
    end

    it { should respond_with :success }

    it "return reviews" do
      expect(json_response[:reviews].length).to eql 10
    end
  end

  describe "POST #create" do
    context "when guest is authorized" do
      before do
        sign_in guest, scope: :guest
      end

      context "when guest visited reviews house" do
        context "when guest`s reviews count equal to visits count" do
          before do
            create :order, guest: guest, house: house
            post :create, params: { house_id: house.id, review: attributes_for(:review) }
            post :create, params: { house_id: house.id, review: attributes_for(:review) }
          end

          it { should respond_with :unprocessable_entity }

          it "returns error" do
            expect(json_response[:errors]).to have_key :guest
          end

        end

        context "when guest`s reviews count less than visits count" do
          before do
            create :order, guest: guest, house: house
            post :create, params: { house_id: house.id, review: attributes_for(:review) }
          end

          it { should respond_with :created }

          it "returns review" do
            expect(json_response[:review]).to have_key :text
          end
        end
      end

      context "when guest didn`t visit reviews house" do
        before do
          post :create, params: { house_id: house.id, review: attributes_for(:review) }
        end

        it { respond_with :forbidden }

        it "returns errors" do
          json_response
          expect(json_response[:errors]).to have_key :guest
        end
      end
    end

    context "when guest is unauthorized" do
      before do
        post :create, params: { house_id: house.id }
      end

      it { should respond_with :unauthorized }
    end
  end
end
