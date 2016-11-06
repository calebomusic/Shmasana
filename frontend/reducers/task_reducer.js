import { RECEIVE_TASK,
         REMOVE_TASK } from '../actions/task_actions'
import merge from 'lodash/merge'

const TaskReducer = (oldState = {}, action) => {
  switch (action.type) {
    case RECEIVE_TASK:
      return action.task
    case REMOVE_TASK:
      return {};
    default:
      return oldState;
  }
}

export default TaskReducer;
