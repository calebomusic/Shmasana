export const fetchWorkspace = (user, id, success, errors) => (
  $.ajax({
    url: `api/users/${user.id}/workspaces/${id}`,
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

export const fetchUserWorkspaces = (id, success, errors) => {
  return $.ajax({
    url: `api/users/${id}/workspaces`,
    success,
    errors
  })
}

export const deleteWorkspace = (user, id, success, errors) => (
  $.ajax({
    url: `api/users/${user.id}/workspaces/${id}`,
    type: 'delete',
    success,
    errors
  })
)

export const updateWorkspace = (user, id, success, errors) => (
  $.ajax({
    url: `api/users/${user.id}/workspaces/${id}`,
    type: 'patch',
    data: {workspace},
    success,
    errors
  })
)

// Does this work?
export const createWorkspace = (workspace, currentUser, success, errors) => {
  $.ajax({
    url: `api/users/${currentUser.id}/workspaces`,
    type: 'post',
    data: {workspace},
    success,
    errors
  })
}
