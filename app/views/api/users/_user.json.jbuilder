json.extract! user, :id, :username
json.workspaces user.workspaces.pluck(:id)
json.projects user.projects.pluck(:id)
json.assigned_tasks user.assigned_tasks.pluck(:id)
json.created_tasks user.created_tasks.pluck(:id)
