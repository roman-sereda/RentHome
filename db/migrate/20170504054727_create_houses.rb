class CreateHouses < ActiveRecord::Migration[5.0]
  def change
    create_table :houses do |t|
      t.integer :floor
      t.boolean :parking
      t.boolean :kitchen
      t.boolean :heating
      t.boolean :conditioner
      t.boolean :animals_allowed
      t.boolean :wi_fi
      t.date :rent_start
      t.date :rent_end
      t.integer :rooms
      t.string :city

      t.timestamps
    end
  end
end
