class AddEventToComment < ActiveRecord::Migration[5.2]
  def change
    add_reference :comments, :event, foreign_key: true, null: false
  end
end
