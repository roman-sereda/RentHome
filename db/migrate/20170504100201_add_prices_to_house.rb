class AddPricesToHouse < ActiveRecord::Migration[5.0]
  def change
    add_column :houses, :price_per_day, :decimal
    add_column :houses, :price_per_month, :decimal
  end
end
