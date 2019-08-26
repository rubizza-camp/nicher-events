# :reek:TooManyStatements
# :reek:UncommunicativeVariableName
class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.text :text
      t.integer :rating

      t.timestamps

      t.references :user, foreign_key: true, null: false
    end
  end
end
