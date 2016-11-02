json.array! @workspaces do |workspace|
  json.partial! 'api/workspaces', workspace: workspace
end
