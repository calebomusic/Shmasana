json.extract! user, :id, :username
json.workspaces user.workspaces.pluck(:id)
json.projects user.projects.pluck(:id)
