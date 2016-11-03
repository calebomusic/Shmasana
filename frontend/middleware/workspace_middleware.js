import {
  receiveWorkspace,
  receiveAllWorkspaces,
  removeWorkspace,
  FETCH_WORKSPACES,
  FETCH_WORKSPACE,
  CREATE_WORKSPACE,
  UPDATE_WORKSPACE,
  DELETE_WORKSPACE
} from '../actions/workspace_actions';

import {
  createWorkspace,
  deleteWorkspace,
  updateWorkspace,
  fetchWorkspaces,
  fetchWorkspace
} from '../util/workspace_api_util';

import { hashHistory } from 'react-router';

const WorkspacesMiddleware = ({getState, dispatch}) => next => action => {
  // TODO: testing
  let errors = e => console.log(e.responseJSON);

  let receiveAllWorkspacesSuccess = workspaces => dispatch(receiveAllWorkspaces(workspaces));
  let receiveWorkspaceSuccess = workspace => dispatch(receiveWorkspace(workspace));
  let removeWorkspaceSuccess = workspace => dispatch(removeWorkspace(workspace));

  switch (action.type) {
    case FETCH_WORKSPACES:
      fetchWorkspaces(receiveAllWorkspacesSuccess);
      return next(action);
    case FETCH_WORKSPACE:
      fetchWorkspace(action.id, receiveWorkspaceSuccess);
      return next(action);
    case CREATE_WORKSPACE:
      createWorkspace(action.workspace, receiveWorkspaceSuccess);
      return next(action);
    case UPDATE_WORKSPACE:
      updateWorkspace(action.workspace, receiveWorkspaceSuccess);
      return next(action);
    case DELETE_WORKSPACE:
      deleteWorkspace(action.id, removeWorkspaceSuccess);
      return next(action);
    default:
      return next(action);
  }
};

export default WorkspacesMiddleware;
