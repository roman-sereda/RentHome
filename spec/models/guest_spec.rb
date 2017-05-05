require 'rails_helper'

RSpec.describe Guest, type: :model do
  before { @guest = FactoryGirl.build(:guest) }

  subject { @guest }

  it { should respond_to(:email) }
end
