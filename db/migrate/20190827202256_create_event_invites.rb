# :reek:UncommunicativeVariableName
class CreateEventInvites < ActiveRecord::Migration[5.2]
  def change
    create_table :event_invites do |t|
      t.belongs_to :user
      t.belongs_to :event
      t.string :email, null: false

      t.timestamps
    end
  end
end
