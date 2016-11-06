class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.integer :author_id, null: false
      t.integer :assignee_id
      t.integer :project_id, null: false
      t.string :title
      t.string :description
      t.datetime :due_date
      t.boolean :completed, default: false
      t.datetime :completed_at

      t.timestamps null: false
    end

    add_index :tasks, :author_id
    add_index :tasks, :assignee_id
    add_index :tasks, :project_id
  end
end
