class CreateSubscriptions < ActiveRecord::Migration[5.0]
  def change
    create_table :subscriptions do |t|
      t.date :end_time
      t.references :host, foreign_key: true
      t.string :email
      t.string :card_token

      t.timestamps
    end
  end
end
