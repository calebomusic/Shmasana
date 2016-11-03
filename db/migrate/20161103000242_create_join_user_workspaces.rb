class CreateJoinUserWorkspaces < ActiveRecord::Migration
  def change
    create_table :join_user_workspaces do |t|
      t.integer :user_id, null: false
      t.integer :workspace_id, null: false
      t.timestamps null: false
    end

    add_index :join_user_workspaces, [:user_id, :workspace_id], unique: true
  end
end
