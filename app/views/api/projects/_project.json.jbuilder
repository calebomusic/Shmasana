json.extract! project, :id, :name, :workspace_id
json.tasks project.tasks.pluck(:id)
# May just nest all tasks in here.
