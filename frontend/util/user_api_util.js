export const fetchUser = (id, success, error) => {
  $.ajax({
    type: 'GET',
    url: `api/users/${id}`,
    success,
    error
  })
}

export const fetchUsersByWorkspace = (workspaceId, success, error) => {
  $.ajax({
    type: 'GET',
    url: `api/workspaces/${workspaceId}/users`,
    success,
    error
  })
}
