export const RECEIVE_COMMENT = 'RECEIVE_COMMENT'
export const FETCH_COMMENT = 'FETCH_COMMENT'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const FETCH_COMMENTS_BY_TASK = 'FETCH_COMMENTS_BY_TASK'

export const createComment = (comment) => (
  {
    type: CREATE_COMMENT,
    comment
  }
)

export const FetchComment = (id) => (
  {
    type: FETCH_COMMENT,
    id
  }
)

export const fetchCommentsByTask = (taskId) => (
  {
    type: FETCH_COMMENTS_BY_TASK,
    taskId
  }
)

export const receiveComment = (comment) => (
  {
    type: RECEIVE_COMMENT,
    comment
  }
)
