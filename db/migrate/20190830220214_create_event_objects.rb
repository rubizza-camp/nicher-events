class CreateEventObjects < ActiveRecord::Migration[5.2]
  def change
    create_table :event_objects do |t|
      t.string :name, null: false
      t.text :description, null: false
      t.string :location, null: false

      t.timestamps
    end
  end
end
