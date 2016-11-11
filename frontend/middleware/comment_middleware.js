import { createComment } from '../util/comment_api_util';
import { CREATE_COMMENT, receiveComment } from '../actions/comment_actions';

const CommentMiddleware = store => next => action => {
  const successfulCreate = (comment) => {
    store.dispatch(receiveComment(comment))
  }

  switch (action.type) {
    case CREATE_COMMENT:
      createComment(action.comment, action.taskId, successfulCreate);
      return next(action);
    default:
      return next(action);
  }
}

export default CommentMiddleware;
