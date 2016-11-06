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

import { hashHistory } from 'react-router';

const ProjectMiddleware = store => next => action => {

  // This is currently the exact same as successfulCreate
  const successfulCreate = (project) => {
    store.dispatch(receiveProject(project));
    // redirectToProject()
  }

  const successfulProjectFetch = (project) => {
    store.dispatch(receiveProject(project));
    // redirectToProject(project)
  }

  const redirectToProject = (project) => {
    const workspaceId = store.getState().workspace.id;
    hashHistory.push(`${workspaceId}/${project.id}`);
  }

  switch (action.type) {
    case FETCH_PROJECT:
      fetchProject(action.id, successfulProjectFetch)
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
