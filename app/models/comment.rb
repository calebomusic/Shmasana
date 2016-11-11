class Comment < ActiveRecord::Base
  validates :body, :author_id, :task_id, presence: true
  
  belongs_to :task
  belongs_to :author, class_name: :user
end
