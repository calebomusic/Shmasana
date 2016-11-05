class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :name
      t.integer :workspace_id

      t.timestamps null: false
    end
  end
end
