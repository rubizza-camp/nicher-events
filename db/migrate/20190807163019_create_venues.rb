# :reek:UncommunicativeVariableName
class CreateVenues < ActiveRecord::Migration[5.2]
  def change
    create_table :venues do |t|
      t.string :address, null: false, default: '', unique: true
      t.text :description, default: ''
      t.integer :people_capacity, default: 0

      t.timestamps
    end
  end
end
