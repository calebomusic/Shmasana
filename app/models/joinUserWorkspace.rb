class JoinUserWorkspace < ActiveRecord::Base
  validates :workspace_id, :user_id, presence: true
  validates_uniqueness_of :user_id, :scope => :workspace_id

  belongs_to :user
  belongs_to :workspace
end
