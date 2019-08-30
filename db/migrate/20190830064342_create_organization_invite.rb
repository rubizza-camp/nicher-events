class CreateOrganizationInvite < ActiveRecord::Migration[5.2]
  def change
    create_table :organization_invites do |t|
      t.string :email
      t.string :token
      t.reference :user
      t.reference :user_organization
    end
  end
end
