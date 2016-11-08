export const fetchUser = (id, success, error) => {
  $.ajax({
    type: 'GET',
    url: `api/users/${id}`,
    success,
    error
  })
}

export const fetchUserByWorkspace = (id, success, error) => {
  $.ajax({
    type: 'GET',
    url: `api/users/${id}`,
    success,
    error
  })
}
