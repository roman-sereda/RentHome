class Review < ApplicationRecord
  belongs_to :guest
  belongs_to :house

  validates_presence_of :rating
  validates :rating, numericality: { greater_than_or_equal_to: 0,
                                    less_than_or_equal_to: 10 }
  validates :text, length: { maximum: 200 }

  before_save do
    order = Order.find_by(house_id: house_id, guest_id: guest_id)
    errors.add(:guest,
      "You should to visit this house to be able to review it") and throw :abort unless order
  end
end
