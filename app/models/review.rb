class Review < ApplicationRecord
  belongs_to :guest

  validates_presence_of :rating
  validates :rating, numericality: { greater_than_or_equal_to: 0,
                                    less_than_or_equal_to: 10 }
  validates :text, length: { maximum: 200 }
end
