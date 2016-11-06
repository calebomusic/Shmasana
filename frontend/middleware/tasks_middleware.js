import {
  receiveTasks,
  FETCH_TASKS_BY_PROJECT,
  FETCH_TASKS_BY_USER,
  FETCH_TASKS_BY_WORKSPACE,
  FETCH_TASKS_BY_USER_AND_PROJECT,
  FETCH_TASKS_BY_USER_AND_WORKSPACE } from '../actions/task_actions';

import { fetchTasksByWorkspace,
         fetchTasksByUser,
         fetchTasksByProject,
         fetchTasksByUserAndProject,
         fetchTasksByUserAndWorkspace
       } from '../util/task_api_util';

import { hashHistory } from 'react-router';

const TasksMiddleware = store => next => action => {
  const successfulFetch = (tasks) => {
    store.dispatch(receiveTasks(tasks))
  }

  // Make dif success callbacks to redirect?

  switch (action.type) {
    case FETCH_TASKS_BY_PROJECT:
      fetchTasksByProject(action.projectId, successfulFetch);
      return next(action);
    case FETCH_TASKS_BY_USER:
      fetchTasksByUser(action.userId, successfulFetch);
      return next(action);
    case FETCH_TASKS_BY_WORKSPACE:
      fetchTasksByWorkspace(action.workspaceId, successfulFetch);
      return next(action);
    case FETCH_TASKS_BY_USER_AND_WORKSPACE:
      fetchTasksByUserAndWorkspace(action.userId, action.workspaceId, successfulFetch);
      return next(action);
    case FETCH_TASKS_BY_USER_AND_PROJECT:
      fetchTasksByUserAndProject(action.userId, action.projectId, successfulFetch)
      return next(action)
    default:
      return next(action)
  }
}

export default TasksMiddleware;
