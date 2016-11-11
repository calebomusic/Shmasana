class CreateJoinUserWorkspaces < ActiveRecord::Migration
  def change
    create_table :join_user_workspaces do |t|
        t.integer  :user_id
        t.integer  :workspace_id
        t.datetime :created_at,   null: false
        t.datetime :updated_at,   null: false
      end
  end
end
