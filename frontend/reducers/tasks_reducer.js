import { RECEIVE_TASKS } from '../actions/task_actions';

const TasksReducer = (oldState = [], action) => {
  switch (action.type) {
    case RECEIVE_TASKS:
      return action.tasks;
    default:
      return oldState;
  }
}

export default TasksReducer;
