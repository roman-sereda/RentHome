class AddHostToHouses < ActiveRecord::Migration[5.0]
  def change
    add_reference :houses, :host, foreign_key: true
  end
end
