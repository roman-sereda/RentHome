class AddRatingToHouse < ActiveRecord::Migration[5.0]
  def change
    add_column :houses, :rating, :integer, default: 0
  end
end
