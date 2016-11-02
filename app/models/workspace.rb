class Workspace < ActiveRecord::Base
  validates :workspace_id, :user_id, presence: true
  validates_uniqueness_of :user_id, :scope => :workspace_id
  
  has_many :workspacings
  has_many :users,
    through: :workspacings
end
