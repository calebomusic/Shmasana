json.extract! workspace, :id, :name
json.users workspace.users.pluck(:id)
json.team workspace.users.pluck(:username, :email)
json.projects workspace.projects
json.tasks workspace.tasks.pluck(:id)
