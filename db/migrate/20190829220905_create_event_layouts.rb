# :reek:UncommunicativeVariableName
class CreateEventLayouts < ActiveRecord::Migration[5.2]
  def change
    create_table :event_layouts do |t|
      t.string :virtual_map, default: ''
      t.references :venue, foreign_key: true
      t.references :event, foreign_key: true

      t.timestamps
    end
  end
end
