json.extract! workspace, :id, :name
json.users workspace.users.pluck(:id)
json.projects workspace.projects.pluck(:id)
json.tasks workspace.tasks.pluck(:id)
