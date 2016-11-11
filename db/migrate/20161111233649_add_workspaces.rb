class AddWorkspaces < ActiveRecord::Migration
  def change
    create_table :workspaces do |t|
      t.string   :name,       null: false
      t.datetime :created_at, null: false
      t.datetime :updated_at, null: false
    end
  end
end
