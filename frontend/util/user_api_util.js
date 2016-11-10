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

export const invite = (userId, workspaceId, success, error) => {
  $.ajax({
    type: 'GET',
    url: `invite/${userId}/${workspaceId}`,
    success,
    error
  })
}

export const fetchUserByUsername = (username, success, error) => {
  $.ajax({
    type: 'GET',
    url: `users/${username}`,
    success,
    error
  })
}
