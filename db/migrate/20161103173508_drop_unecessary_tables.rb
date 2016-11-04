class DropUnecessaryTables < ActiveRecord::Migration
  def change
    drop_table :workspacings
  end
end
