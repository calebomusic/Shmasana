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

import { hashHistory, Router } from 'react-router';

const ProjectMiddleware = store => next => action => {

  // This is currently the exact same as successfulCreate
  const successfulCreate = (project) => {
    store.dispatch(receiveProject(project));
    redirectToProject(project);
  }

  const successfulProjectFetch = (project) => {
    store.dispatch(receiveProject(project));
    redirectToProject(project);
  }

  const redirectToProject = (project) => {
    let urlProjectId;

    if (this && this.url) {
    let  url = this.url.split('/');
    urlProjectId = parseInt(url[2]);
    }

    if (project.id !== urlProjectId) {
      const currentUserId = store.getState().session.currentUser.id
      const workspaceId = project.workspace_id;
      hashHistory.push(`${currentUserId}/${workspaceId}/${project.id}`);
    }
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
