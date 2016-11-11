import { RECEIVE_CURRENT_USER} from '../actions/session_actions.js';
import { RECEIVE_TASK, FETCH_TASK } from '../actions/task_actions'
import {CLOSE_SIDEBAR, OPEN_SIDEBAR} from '../actions/sidebar_actions'
import {
  FETCH_WORKSPACE,
  FETCH_USER_WORKSPACE_ON_LOGIN,
  RECEIVE_WORKSPACE } from '../actions/workspace_actions';

import {
  FETCH_PROJECT,
  RECEIVE_PROJECT,
  FETCH_PROJECTS_BY_WORKSPACE } from '../actions/project_actions';

const MainContentSpinnerReducer = (oldState = false, action) => {
  let newState
  switch (action.type) {
    case FETCH_WORKSPACE:
      return true;
    case FETCH_USER_WORKSPACE_ON_LOGIN:
      return true;
    case FETCH_PROJECT:
      return true;
    case FETCH_TASK:
      return true;
    case FETCH_PROJECTS_BY_WORKSPACE:
      return true;
    case RECEIVE_PROJECT:
      return false;
    case RECEIVE_CURRENT_USER:
      return false;
    case RECEIVE_TASK:
      return false;
    case RECEIVE_WORKSPACE:
      return false;
    case RECEIVE_PROJECT:
      return false;
    default:
      return oldState;
  }
}

export default MainContentSpinnerReducer
