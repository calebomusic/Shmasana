import { hashHistory } from 'react-router';
import { isEqual } from 'lodash';

import {  CREATE_TASK,
          UPDATE_TASK,
          FETCH_TASK,
          DELETE_TASK,
          UPDATE_AND_FETCH,
          receiveTask,
          receiveTaskBegin,
          receiveTaskEnd,
          removeTask,
          end,
          revert } from '../actions/task_actions';
import { createTask,
         updateTask,
         fetchTask,
         deleteTask } from '../util/task_api_util.js';
import { fetchProject } from '../actions/project_actions';
import { fetchTasksByUserAndWorkspace,
         fetchTasksByProject } from '../actions/tasks_actions';

const TaskMiddleware = store => next => action => {
    const successfulCreate = (task) => {
      store.dispatch(receiveTask(task));
      fetchTasks();
    }

    const successfulUpdateAndFetch = (task) => {
      successfulUpdate(task);
      fetchTasks();
    }

    const successfulUpdate = (task) => {
      const presentTask = store.getState().task.present;
      if (isEqual(presentTask, task)) {
        store.dispatch(end());
      } else {
        store.dispatch(receiveTaskEnd(task));
      }
    }

    const fetchProjectOnProjectChange = (projectId) => {
      store.dispatch(fetchProject(projectId));
    }

    const successfulFetch = (task) => {
      store.dispatch(receiveTask(task))
      redirect(task)
    }

    const redirect = (task) => {
      const authorId = task.author_id;
      const workspaceId = task.workspace_id;

      if (task.project_id) {
        const projectId = task.project_id;
        hashHistory.push(`${authorId}/${workspaceId}/${projectId}/${task.id}`)
      } else {
        hashHistory.push(`${authorId}/${workspaceId}/list/${task.id}`)
      }
    }

    const successfulDelete = () => {
      store.dispatch(removeTask());
      fetchTasks();
    }

    const fetchTasks = () => {
      const pathname = hashHistory.getCurrentLocation().pathname;
      const params = pathname.split('/')

      if (params[3] === 'list' || params.length === 3 || params[3] === '') {
        const userId = parseInt(params[1]);
        const workspaceId = parseInt(params[2]);
        store.dispatch(fetchTasksByUserAndWorkspace(userId, workspaceId));
      } else {
        const projectId = parseInt(params[3]);

        if (store.getState().project.id !== projectId) {
          fetchProjectOnProjectChange(projectId);
        } else {
          store.dispatch(fetchTasksByProject(projectId));
        }
      }
    }

    const revertOnError = () => {
      store.dispatch(revert());
    }

  switch (action.type) {
    case CREATE_TASK:
      createTask(action.task, action.task.workspace_id, successfulCreate);
      return next(action);
    case UPDATE_TASK:
      store.dispatch(receiveTaskBegin(action.task));
      updateTask(action.task, action.task.workspace_id, successfulUpdate, revertOnError);
      return next(action);
    case UPDATE_AND_FETCH:
      store.dispatch(receiveTaskBegin(action.task));
      updateTask(action.task, action.task.workspace_id, successfulUpdateAndFetch, revertOnError);
      return next(action);
    case FETCH_TASK:
      fetchTask(action.id, successfulFetch);
      return next(action);
    case DELETE_TASK:
      deleteTask(action.id, successfulDelete);
      return next(action);
    default:
      return next(action);
  }
}

export default TaskMiddleware;
