class AddColumnToGuets < ActiveRecord::Migration[5.0]
  def change
    add_column :guests, :surname, :string, presence: true
    add_column :guests, :country, :string
    add_column :guests, :city, :string
    add_index :guests, :country
    add_index :guests, :city
  end
end
