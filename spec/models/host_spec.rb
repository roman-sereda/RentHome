require 'rails_helper'

RSpec.describe Guest, type: :model do
  before { @host = FactoryGirl.build(:host) }

  subject { @host }

  it { should respond_to(:name) }
  it { should respond_to(:nickname) }
  it { should respond_to(:surname) }
  it { should respond_to(:email) }
  it { should respond_to(:password) }
  it { should respond_to(:city) }
  it { should respond_to(:country) }
  it { should respond_to(:image) }

  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:surname) }
  it { should validate_presence_of(:email) }
  it { should validate_presence_of(:password) }

  it { should validate_uniqueness_of(:email).ignoring_case_sensitivity }
  it { should validate_confirmation_of(:password) }
  it { should allow_value('example@domain.com').for(:email) }
  it { should_not allow_value('exampledomain.com').for(:email) }

  it { should be_valid }
end
