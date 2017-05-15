class AddDescriptionToHouse < ActiveRecord::Migration[5.0]
  def change
    add_column :houses, :description, :text
  end
end
