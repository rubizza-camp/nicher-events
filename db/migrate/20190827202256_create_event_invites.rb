# :reek:UncommunicativeVariableName
# :reek:TooManyStatements
class CreateEventInvites < ActiveRecord::Migration[5.2]
  def change
    create_table :event_invites do |t|
      t.belongs_to :user
      t.belongs_to :event
      t.string :email, null: false
      t.string :token
      t.datetime :access_at
      t.datetime :decline_at

      t.timestamps
    end
  end
end
