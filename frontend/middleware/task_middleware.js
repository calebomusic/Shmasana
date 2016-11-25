import { hashHistory } from 'react-router';

import {  CREATE_TASK,
          UPDATE_TASK,
          FETCH_TASK,
          DELETE_TASK,
          receiveTask,
          removeTask} from '../actions/task_actions';
import { createTask,
         updateTask,
         fetchTask,
         deleteTask } from '../util/task_api_util.js';
import { fetchProject } from '../actions/project_actions';
import { fetchTasksByUserAndWorkspace,
         fetchTasksByProject } from '../actions/tasks_actions';

const TaskMiddleware = store => next => action => {
    const successfulCreateOrUpdate = (task) => {
      store.dispatch(receiveTask(task));
      fetchTasks();
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

      if (params[3] === 'list' ) {
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

  switch (action.type) {
    case CREATE_TASK:
      createTask(action.task, action.task.workspace_id, successfulCreateOrUpdate);
      return next(action);
    case UPDATE_TASK:
      updateTask(action.task, action.task.workspace_id, successfulCreateOrUpdate);
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
