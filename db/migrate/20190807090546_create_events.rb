class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string :name, null: false
      t.timestamp :date, null: false
      t.text :description, null: false
      t.integer :status, null: false, default: 0
      t.timestamps

      t.integer :user_id
      # t.references :user, foreign_key: true
    end
  end
end
