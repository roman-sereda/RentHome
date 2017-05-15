class AddHouseReferencesToReview < ActiveRecord::Migration[5.0]
  def change
    add_reference :reviews, :house, foreign_key: true 
  end
end
