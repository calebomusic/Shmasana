export const createComment = (comment, taskId, success, errors) => (
  $.ajax({
      type: 'post',
      url: `api/tasks/${taskId}/comments`,
      data: {comment},
      success,
      errors
    })
)


export const fetchComment = (id, success, errors) => {
  $.ajax({
      type: 'get',
      url: `api/comments/${id}`,
      success,
      error
    })
}

export const fetchCommentsByTask = (taskId, success, errors) => {
  $.ajax({
    type: 'get',
    url: `api/tasks/${taskId}`,
    success
  })
}
