class Workspace < ActiveRecord::Base
  has_many :join_user_workspaces
  has_many :users,
    through: :join_user_workspaces
  has_many :projects
  has_many :tasks
end
