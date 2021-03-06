import {
  receiveProject,
  FETCH_PROJECT,
  RECEIVE_PROJECT,
  FETCH_PROJECTS_BY_WORKSPACE,
  CREATE_PROJECT
} from '../actions/project_actions';

import {
  fetchProjectByWorkspace,
  createProject,
  fetchProject
} from '../util/project_api_util';

import {
  fetchTasksByProject
} from '../actions/tasks_actions';

import { hashHistory, Router } from 'react-router';

const ProjectMiddleware = store => next => action => {

  // This is currently the exact same as successfulCreate
  const successfulCreate = (project) => {
    store.dispatch(receiveProject(project));
    redirectToProject(project);
  }

  const successfulProjectFetch = (project) => {
    store.dispatch(receiveProject(project));
    store.dispatch(fetchTasksByProject(project.id));
    // unless already at the project
    const locationProjectId = parseInt(hashHistory.getCurrentLocation().pathname.split('/')[3])
    const projectId = project.id

    if (projectId !== locationProjectId) {
      redirectToProject(project);
    }
  }

  const redirectToProject = (project) => {
      const currentUserId = store.getState().session.currentUser.id
      const workspaceId = project.workspace_id;
      hashHistory.push(`${currentUserId}/${workspaceId}/${project.id}`);
  }

  switch (action.type) {
    case FETCH_PROJECT:
      fetchProject(action.id, successfulProjectFetch)
      return next(action)
    case FETCH_PROJECTS_BY_WORKSPACE:
      // Why would this need to be an action?
      return next(action);
    case CREATE_PROJECT:
      createProject(action.project, action.project.workspace_id, successfulCreate)
      return next(action);
    default:
      return next(action);
  }
}

export default ProjectMiddleware;
