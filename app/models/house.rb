class House < ApplicationRecord


  validates_presence_of :floor, :rent_start, :rent_end, :rooms, :city

  validates :floor, numericality: { greater_than_or_equal_to: 0 }
  validates :rooms, numericality: { greater_than: 0 }
  validate :check_if_rent_period_is_valid

  private

  def check_if_rent_period_is_valid
    if (self.rent_start && self.rent_end && self.rent_start > self.rent_end)
      errors.add(:rent_start,
        "should be less than, or equal to rend_end")
      errors.add(:rent_end,
        "should be greater than, or equal to rend_start")
    end
  end
end
