class Comment < ActiveRecord::Base
  validates :body, :author_id, :task_id, presence: true

  belongs_to :task, foreign_key: :task_id
  belongs_to :author,
    class_name: :User, foreign_key: :author_id
end
