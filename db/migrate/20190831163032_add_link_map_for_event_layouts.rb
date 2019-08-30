class AddLinkMapForEventLayouts < ActiveRecord::Migration[5.2]
  def change
    add_column :event_layouts, :link_map, :string, default: ''
  end
end
