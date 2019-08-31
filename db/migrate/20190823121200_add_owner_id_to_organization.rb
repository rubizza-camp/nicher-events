class AddOwnerIdToOrganization < ActiveRecord::Migration[5.2]
  def change
    add_column :organizations, :owner_id, :integer
  end
end
