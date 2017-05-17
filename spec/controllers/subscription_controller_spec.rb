require "rails_helper"

RSpec.describe SubscriptionController, type: :controller do
  include Devise::Test::ControllerHelpers

  let(:host) { create :host }
  let(:subscription) { create :subscription, host: host }

  describe "GET #create" do
    context "when host is authorized" do
      before { sign_in host, scope: :host }

      context "when subscription data is valid" do
        before do
          post :create, params: {
            subscription: attributes_for(:subscription) }
        end

        it { should respond_with :created }

        it "creates new subscription" do
          expect(Subscription.count).to eql 1
        end

        it "returns subscription" do
          expect(json_response[:subscription][:email]).to eql subscription.email
        end
      end

      context "when subscription data is invalid" do
        before do
          post :create, params: {
            subscription: attributes_for(:subscription, email: nil) }
        end

        it { should respond_with :unprocessable_entity }

        it "returns errors" do
          expect(json_response[:errors]).to be_truthy
        end
      end
    end

    context "when host is unauthorized" do
      before do
        post :create, params: {
          subscription: attributes_for(:subscription) }
      end

      it { should respond_with :unauthorized }
    end
  end

  describe "GET #show" do
    context "when host is authorized" do
      context "when host has subscription" do
        before do
          sign_in host, scope: :host
          subscription
          get :show
        end

        it { should respond_with :success }

        it "returns host`s subscription info" do
          expect(json_response[:subscription][:email]).to eql subscription.email
        end
      end

      context "when host has no subscription" do
        before do
          sign_in host, scope: :host
          get :show
        end

        it { should respond_with :success }

        it "returns empty subscription" do
          expect(json_response[:subscription]).to eql nil
        end
      end
    end
  end
end
