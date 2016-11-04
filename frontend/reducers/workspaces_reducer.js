import { RECEIVE_ALL_WORKSPACES,
         RECEIVE_WORKSPACE,
         REMOVE_WORKSPACE } from '../actions/workspace_actions';
import merge from 'lodash/merge';

const WorkspacesReducer = (oldState = {}, action) => {
  let newState
  switch (action.type) {
    case RECEIVE_ALL_WORKSPACES:
      return merge({}, action.workspaces);
    case RECEIVE_WORKSPACE:
      return merge({}, {[action.workspace.id]: action.workspace});
    case REMOVE_WORKSPACE:
      newState = merge({}, oldState);
      delete newState[action.workspace.id];
      return newState;
    default:
      return oldState;
  }
};

export default WorkspacesReducer;
