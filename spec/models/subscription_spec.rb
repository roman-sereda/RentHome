require 'rails_helper'

RSpec.describe Subscription, type: :model do

  subject { create :subscription }

  it { should respond_to :end_time }

  it { should respond_to :host_id }

  it { should respond_to :email }

  it { should respond_to :card_token }

  it { should validate_presence_of :email }

  it { should validate_presence_of :card_token }

  it { should belong_to :host }
end
