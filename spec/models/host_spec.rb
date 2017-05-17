require 'rails_helper'

RSpec.describe Host, type: :model do
  subject { build(:host) }

  it { should respond_to(:name) }
  it { should respond_to(:nickname) }
  it { should respond_to(:surname) }
  it { should respond_to(:email) }
  it { should respond_to(:password) }
  it { should respond_to(:city) }
  it { should respond_to(:country) }
  it { should respond_to(:image) }

  # it { should validate_presence_of(:name) }
  # it { should validate_presence_of(:surname) }
  it { should validate_presence_of(:email) }
  it { should validate_presence_of(:password) }

  it { should validate_uniqueness_of(:email).ignoring_case_sensitivity }
  it { should validate_confirmation_of(:password) }
  it { should allow_value('example@domain.com').for(:email) }
  it { should_not allow_value('exampledomain.com').for(:email) }

  it { should have_many(:houses).dependent(:destroy) }
  it { should have_one(:subscription).dependent(:destroy) }
  it { should have_many(:orders).through(:houses) }

  it { should be_valid }

  context "when is subscribed" do
    context "when subscription is valid" do
      it "returns true" do
        create(:subscription, host: subject)
        expect(subject.subscribed?).to be true
      end
    end

    context "when subscription is invalid" do
      it "returns nil" do
        create(:subscription, host: subject, end_time: Date.yesterday)
        expect(subject.subscribed?).to be nil
      end
    end
  end

  context "when is not subscribed" do
    it "returns nil" do
      expect(subject.subscribed?).to be nil
    end
  end
end
