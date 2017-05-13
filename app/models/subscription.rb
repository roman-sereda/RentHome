class Subscription < ApplicationRecord
  validates_presence_of :card_token, :email

  belongs_to :host
end
