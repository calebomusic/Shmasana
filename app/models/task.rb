class Task < ActiveRecord::Base
  validates :author_id, presence: true

  belongs_to :author, class_name: :User
  belongs_to :project
  belongs_to :workspace
  belongs_to :assignee, class_name: :User
  has_one :workspace, through: :project
  has_many :comments, class_name: :Comment
end
