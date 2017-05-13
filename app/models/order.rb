class Order < ApplicationRecord
  belongs_to :guest
  belongs_to :house
  has_one :host, through: :house

  validates_presence_of :end_time, :start_time, :total_price

  validates :total_price, numericality: { greater_than_or_equal_to: 0.01 }
  validate :if_time_period_is_valid

  private

    def if_time_period_is_valid
      if start_time && end_time && start_time > end_time
        errors.add(:start_time,
          "should be less than, or equal to end_time")
        errors.add(:end_time,
          "should be greater than, or equal to start_time")
      end

      orders = house.orders.where("start_time >= :start AND end_time <= :end",
                 { start: start_time, end: end_time })
      if orders.count > 0
        errors.add(:ordered_days,
          "Some days has been olready taken")
      end
    end
end
