class House < ApplicationRecord
  belongs_to :host
  has_many :orders, dependent: :destroy

  validates_presence_of :floor, :rent_start, :rent_end, :rooms, :city
  validates :floor, numericality: { greater_than_or_equal_to: 0 }
  validates :rooms, numericality: { greater_than: 0 }
  validates :price_per_day, numericality: { greater_than_or_equal_to: 0.01 }, allow_blank: true
  validates :price_per_month, numericality: { greater_than_or_equal_to: 0.01 }, allow_blank: true
  validates :description, length: { maximum: 500 }
  validate :if_rent_period_is_valid
  validate :if_there_is_at_least_one_price

  before_save :check_if_host_is_subscribed?

  is_impressionable

  private

    def check_if_host_is_subscribed?
      host = Host.find host_id
      if host.subscribed? || host.houses.count < 5
        return true
      end

      errors.add(:subscription,
        "You should to subscribe to be able to create more than 5 houses")
      throw :abort
    end

    def if_rent_period_is_valid
      if rent_start && rent_end && rent_start > rent_end
        errors.add(:rent_start,
          "should be less than, or equal to rend_end")
        errors.add(:rent_end,
          "should be greater than, or equal to rend_start")
      end
    end

    def if_there_is_at_least_one_price
      unless price_per_day || price_per_month
        errors.add(:price_per_day,
          "should be at least one price")
        errors.add(:price_per_month,
          "should be at least one price")
      end
    end
end
