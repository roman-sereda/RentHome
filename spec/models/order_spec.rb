require 'rails_helper'

RSpec.describe Order, type: :model do
  subject { build :order }

  it { should respond_to :guest_id }
  it { should respond_to :house_id }
  it { should respond_to :start_time }
  it { should respond_to :end_time }
  it { should respond_to :paid }
  it { should respond_to :total_price }

  it { should validate_presence_of :start_time }
  it { should validate_presence_of :end_time }
  it { should validate_presence_of :total_price }

  it { should validate_numericality_of(:total_price)
    .is_greater_than_or_equal_to(0.01) }

  it { should belong_to :guest }
  it { should belong_to :house }
  it { should have_one(:host).through(:house) }

  it { should be_valid }

  context "when time period is invalid" do
    it "return errors" do
      order = build :order, end_time: Date.yesterday
      expect(order).to be_invalid
      expect(order.errors).to have_key :start_time
      expect(order.errors).to have_key :end_time
    end
  end

  context "when requested days is already ordered" do
    let(:house) { create(:house) }

    it "return errors" do
      create :order, house: house
      order = build :order, house: house
      expect(order).to be_invalid
      expect(order.errors).to have_key :ordered_days
    end
  end
end
