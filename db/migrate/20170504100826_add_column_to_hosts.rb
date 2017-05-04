class AddColumnToHosts < ActiveRecord::Migration[5.0]
  def change
    add_column :hosts, :surname, :string, presence: true
    add_column :hosts, :country, :string
    add_column :hosts, :city, :string
    add_index :hosts, :country
    add_index :hosts, :city
  end
end
