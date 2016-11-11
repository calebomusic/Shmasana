import { RECEIVE_TASK,
         REMOVE_TASK } from '../actions/task_actions';
import { RECEIVE_COMMENT } from '../actions/comment_actions';

import merge from 'lodash/merge'

const TaskReducer = (oldState = {}, action) => {
  let newState = merge({}, oldState)
  switch (action.type) {
    case RECEIVE_TASK:
      return action.task;
    case REMOVE_TASK:
      return {};
    case RECEIVE_COMMENT:
      let commentIds = newState.comments.map((comment) => comment.id)

      if (!commentIds.includes(action.comment.id)) {
        newState.comments.push(action.comment);
      }

      return newState;
    default:
      return oldState;
  }
}

export default TaskReducer;
