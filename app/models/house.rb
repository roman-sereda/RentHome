class House < ApplicationRecord
  is_impressionable

  validates_presence_of :floor, :rent_start, :rent_end, :rooms, :city

  validates :floor, numericality: { greater_than_or_equal_to: 0 }
  validates :rooms, numericality: { greater_than: 0 }
  validates :price_per_day, numericality: { greater_than_or_equal_to: 0.01 }, allow_blank: true
  validates :price_per_month, numericality: { greater_than_or_equal_to: 0.01 }, allow_blank: true
  validate :check_if_rent_period_is_valid
  validate :check_if_there_is_at_least_one_price

  private

  def check_if_rent_period_is_valid
    if (self.rent_start && self.rent_end && self.rent_start > self.rent_end)
      errors.add(:rent_start,
        "should be less than, or equal to rend_end")
      errors.add(:rent_end,
        "should be greater than, or equal to rend_start")
    end
  end

  def check_if_there_is_at_least_one_price
    unless (self.price_per_day || self.price_per_month)
      errors.add(:price_per_day,
        "should be at least one price")
      errors.add(:price_per_month,
        "should be at least one price")
    end
  end
end
