class CreateOrganizationIntives < ActiveRecord::Migration[5.2]
  def change
    create_table :organization_intives do |t|
      t.string :email
      t.string :token
      t.references :user, foreign_key: true
      t.references :user_organization, foreign_key: true
      t.timestamps
    end
  end
end
