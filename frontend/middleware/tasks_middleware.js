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
  // TODO: for testing
  const errors = (errors) => {
    console.log(errors)
  }
  switch (action.type) {
    case FETCH_TASKS_BY_PROJECT:
      fetchTasksByProject(action.projectId, successfulFetch, errors);
      return next(action);
    case FETCH_TASKS_BY_USER:
      fetchTasksByUser(action.userId, successfulFetch, errors);
      return next(action);
    case FETCH_TASKS_BY_WORKSPACE:
      fetchTasksByWorkspace(action.workspaceId, successfulFetch, errors);
      return next(action);
    case FETCH_TASKS_BY_USER_AND_WORKSPACE:
      fetchTasksByUserAndWorkspace(action.userId, action.workspaceId, successfulFetch, errors);
      return next(action);
    case FETCH_TASKS_BY_USER_AND_PROJECT:
      fetchTasksByUserAndProject(action.userId, action.projectId, successfulFetch, errors)
      return next(action)
    default:
      return next(action)
  }
}

export default TasksMiddleware;
