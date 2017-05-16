class AddAdditionalAttributesToHouse < ActiveRecord::Migration[5.0]
  def change
    add_column :houses, :type_of_building, :integer
    add_column :houses, :title, :string
    add_column :houses, :address, :string
    add_column :houses, :sleep_places, :integer
    add_column :houses, :total_area, :float
    add_column :houses, :apartment_number, :integer
  end
end
