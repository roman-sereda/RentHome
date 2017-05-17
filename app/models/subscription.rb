class Subscription < ApplicationRecord
  belongs_to :host

  validates_presence_of :card_token, :email  
end
