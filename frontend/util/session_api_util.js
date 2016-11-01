export const signup = (user, success, error) => {
  $.ajax({
    type: 'post',
    url: 'api/users',
    data: user,
    success,
    error
  })
}

export const login = (user, success, error) => {
  $.ajax({
    type: 'post',
    url: 'api/session',
    data: user,
    success,
    error
  })
}


export const logout = (user, success, error) => {
  $.ajax({
    type: 'delete',
    url: 'api/session',
    data: user,
    success,
    error
  })
}
