class RemoveNullConstraintOnJoinUserWorkspaces < ActiveRecord::Migration
  def change
    change_column :join_user_workspaces, :user_id, :integer, null: true
    change_column :join_user_workspaces, :workspace_id, :integer, null: true
  end
end
