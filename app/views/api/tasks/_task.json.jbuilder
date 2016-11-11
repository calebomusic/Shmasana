json.extract! task, :author_id, :assignee_id, :project_id, :title, :description,
                    :due_date, :completed, :completed_at, :id, :created_at, :workspace_id
json.assignee task.assignee
json.author task.author
json.project task.project

json.comments task.comments, partial: 'api/comments/comment', as: :comment
