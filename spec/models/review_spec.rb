require 'rails_helper'

RSpec.describe Review, type: :model do
  subject { build :review }

  it { should respond_to :text }

  it { should respond_to :rating }

  it { should belong_to :guest }

  it { should validate_presence_of :rating }

  it { should validate_numericality_of(:rating)
                .is_greater_than_or_equal_to(0)
                .is_less_than_or_equal_to(10)   }

  it { should validate_length_of(:text).is_at_most(200) }

  it { should be_valid }
end
