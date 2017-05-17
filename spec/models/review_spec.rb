require 'rails_helper'

RSpec.describe Review, type: :model do
  subject { build :review }

  let(:house) { subject.house }
  let(:guest) { subject.guest }

  before { create :order, guest: guest, house: house }

  it { should respond_to :text }

  it { should respond_to :rating }

  it { should belong_to :guest }

  it { should belong_to :house }

  it { should validate_presence_of :rating }

  it { should validate_numericality_of(:rating)
                .is_greater_than_or_equal_to(0)
                .is_less_than_or_equal_to(10)   }

  it { should validate_length_of(:text).is_at_most(200) }

  it { should be_valid }

  it "updates house rating after_save" do
   review = create :review, guest: guest, house: house, rating: 1
   expect{
     create :order, guest: guest, house: house,
       start_time: Date.today.next_month, end_time: Date.today.next_month
     review = create :review, guest: guest, house: house, rating: 3
   }.to change{ house.rating }.from(1).to(2)
  end
end
