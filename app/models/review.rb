class Review < ApplicationRecord

  belongs_to :guest
  belongs_to :house

  validates_presence_of :rating
  validates :rating, numericality: { greater_than_or_equal_to: 0,
                                    less_than_or_equal_to: 10 }
  validates :text, length: { maximum: 200 }
  validate :if_guest_visited_house

  after_save :update_house_rating

  private

    def update_house_rating
      count = house.reviews.count
      house.update_attributes(rating: (((count-1) * house.rating + rating)/count).round)
    end

    def if_guest_visited_house
      order = Order.where(house_id: house_id, guest_id: guest_id)
      errors.add(:guest,
        "You can write 1 review per 1 visit") unless house.reviews.count < order.count
    end
end
