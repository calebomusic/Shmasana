import { merge } from 'lodash';
import { hashHistory } from 'react-router';
import { RECEIVE_CURRENT_USER, RECEIVE_ERRORS, LOGOUT} from '../actions/session_actions.js';
import { RECEIVE_WORKSPACE } from '../actions/workspace_actions';

const null_user = {
  currentUser: null,
  errors: []
}

export default (state = null_user, action) => {
  Object.freeze(state);
  const newState = merge({}, state)
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        currentUser: action.currentUser,
        errors: []
      }
    case RECEIVE_ERRORS:
      let errors;
      if(action.errors.responseJSON) {
        errors = action.errors.responseJSON.slice(0, 2)
      }
      return {
        currentUser: null,
        errors: errors
      }
    case LOGOUT:
      return null_user;
    case RECEIVE_WORKSPACE:
      if (!newState.currentUser.workspaces.includes(action.workspace.id)) {
        newState.currentUser.workspaces.push(action.workspace.id)
      }
      return newState;
    default:
      return state;
  }
}

// TODO: receive new task, project?
