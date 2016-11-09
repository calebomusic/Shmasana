import {
  receiveWorkspace,
  receiveAllWorkspaces,
  removeWorkspace,
  FETCH_WORKSPACES,
  FETCH_WORKSPACE,
  FETCH_USER_WORKSPACES,
  FETCH_USER_WORKSPACE_ON_LOGIN,
  FETCH_USER_WORKSPACES_ON_LOGIN,
  CREATE_WORKSPACE,
  UPDATE_WORKSPACE,
  DELETE_WORKSPACE
} from '../actions/workspace_actions';

import {
  createWorkspace,
  deleteWorkspace,
  updateWorkspace,
  fetchWorkspaces,
  fetchWorkspace,
  fetchUserWorkspaces
} from '../util/workspace_api_util';

import { hashHistory } from 'react-router';

const WorkspacesMiddleware = store => next => action => {
  // TODO: testing
  let errors = e => console.log(e.responseJSON);

  let receiveAllWorkspacesSuccess = workspaces => {
    store.dispatch(receiveAllWorkspaces(workspaces));
  }

  let receiveAllUserWorkspacesSuccess = workspaces => {
    store.dispatch(receiveAllWorkspaces(workspaces));
  }

  // Dispatches receive workspace on login in order to direct user to
  // their last workspace on login

  // This is now the same as rws below
    let receiveWorkspaceOnLoginSuccess = workspace => {
      store.dispatch(receiveWorkspace(workspace));
      redirectToNewWorkspace(workspace)
    }

  let receiveWorkspaceSuccess = workspace => {
    store.dispatch(receiveWorkspace(workspace));
    redirectToNewWorkspace(workspace);
  }

  let redirectToNewWorkspace = (workspace) => {
    let currentUserId
    if (store.getState().session.currentUserId) {
      currentUserId = store.getState().session.currentUser;
    } else {
      currentUserId = workspace.users[0];
    }

    const workspaceId = workspace.id;
    const locationWorkspaceId = parseInt(hashHistory.getCurrentLocation().pathname.split('/')[2])

    if (locationWorkspaceId !== workspaceId) {
      hashHistory.push(`${currentUserId}/${workspaceId}`)
    }
  }

  let removeWorkspaceSuccess = workspace => store.dispatch(removeWorkspace(workspace));

  const currentUser = store.getState().session.currentUser

  switch (action.type) {
    case FETCH_WORKSPACES:
      fetchWorkspaces(receiveAllWorkspacesSuccess);
      return next(action);
    case FETCH_WORKSPACE:
      fetchWorkspace(action.id, currentUser, receiveWorkspaceSuccess);
      return next(action);
    case FETCH_USER_WORKSPACES_ON_LOGIN:
      fetchUserWorkspaces(action.user_id, receiveWorkspaceOnLogin)
      return next(action);
    case FETCH_USER_WORKSPACE_ON_LOGIN:
      fetchWorkspace(action.id, currentUser, receiveWorkspaceOnLoginSuccess);
      return next(action);
    case FETCH_USER_WORKSPACES:
      fetchUserWorkspaces(action.user_id, receiveAllUserWorkspacesSuccess)
      return next(action);
    case CREATE_WORKSPACE:
      createWorkspace(action.workspace, currentUser, receiveWorkspaceSuccess);
      return next(action);
    case UPDATE_WORKSPACE:
      updateWorkspace(action.workspace, currentUser, receiveWorkspaceSuccess);
      return next(action);
    case DELETE_WORKSPACE:
      deleteWorkspace(action.id, removeWorkspaceSuccess);
      return next(action);
    default:
      return next(action);
  }
};

export default WorkspacesMiddleware;
