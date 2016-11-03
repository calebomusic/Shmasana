export const fetchWorkspace = (id, success, errors) => (
  $.ajax({
    url: `api/workspaces/${id}`,
    success,
    errors
  })
)

export const fetchWorkspaces = (success, errors) => (
  $.ajax({
    url: `api/workspaces`,
    success,
    errors
  })
)

export const deleteWorkspace = (id, success, errors) => (
  $.ajax({
    url: `api/workspaces/${id}`,
    type: 'delete',
    success,
    errors
  })
)

export const updateWorkspace = (workspace, success, errors) => (
  $.ajax({
    url: `api/workspaces/${workspace.id}`,
    type: 'patch',
    data: {workspace},
    success,
    errors
  })
)

export const createWorkspace = (workspace, success, errors) => (
  $.ajax({
    url: `api/workspaces`,
    type: 'create',
    data: {workspace},
    success,
    errors
  })
)
