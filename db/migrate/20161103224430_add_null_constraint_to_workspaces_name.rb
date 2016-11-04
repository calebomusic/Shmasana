class AddNullConstraintToWorkspacesName < ActiveRecord::Migration
  def change
    change_column :workspaces, :name, :string, null: false
  end
end
