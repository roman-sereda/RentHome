require 'rails_helper'

RSpec.describe House, type: :model do
  subject { build :house }

  it { should respond_to :floor }

  it { should respond_to :parking }

  it { should respond_to :heating }

  it { should respond_to :kitchen }

  it { should respond_to :conditioner }

  it { should respond_to :animals_allowed }

  it { should respond_to :wi_fi }

  it { should respond_to :rent_start }

  it { should respond_to :rent_end }

  it { should respond_to :rooms }

  it { should respond_to :city }

  it { should respond_to :price_per_day }

  it { should respond_to :price_per_month }

  it { should respond_to :description }

  it { should respond_to(:rating) }

  it { should validate_presence_of :floor }

  it { should validate_presence_of :rent_start }

  it { should validate_presence_of :rent_end }

  it { should validate_presence_of :rooms }

  it { should validate_presence_of :city }

  it { should validate_numericality_of(:floor)
                .is_greater_than_or_equal_to(0) }

  it { should validate_numericality_of(:rooms)
                .is_greater_than(0) }

  it { should validate_numericality_of(:price_per_day)
                .is_greater_than_or_equal_to(0.01) }

  it { should validate_numericality_of(:price_per_month)
                .is_greater_than_or_equal_to(0.01) }

  it { should validate_length_of(:description).is_at_most(500) }

  it { should belong_to :host }

  it { should have_many(:reviews).dependent(:destroy) }

  it "validates if rent end is later than rent start" do
    subject.rent_start = "2017-05-04"
    subject.rent_end = "2017-05-03"
    expect(subject).to_not be_valid
    expect(subject.errors[:rent_start]).to include "should be less than, or equal to rend_end"
    expect(subject.errors[:rent_end]).to include "should be greater than, or equal to rend_start"
  end

  it "validates if at least one price is present" do
    subject.price_per_month = nil
    subject.price_per_day = nil
    expect(subject).to_not be_valid
    expect(subject.errors[:price_per_month]).to include "should be at least one price"
    expect(subject.errors[:price_per_day]).to include "should be at least one price"
  end

  it { should be_valid }
end
