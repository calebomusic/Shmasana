import { merge } from 'lodash';
import { hashHistory } from 'react-router';
import { RECEIVE_CURRENT_USER, RECEIVE_ERRORS, LOGOUT} from '../actions/session_actions.js';

const null_user = {
  currentUser: null,
  errors: []
}

export default (state = null_user, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        currentUser: action.currentUser,
        errors: []
      }
    case RECEIVE_ERRORS:
      debugger
      return {
        currentUser: null,
        errors: action.errors.responseJSON
      }
    case LOGOUT:
      hashHistory.replace('/login')
      return null_user
    default:
      return state;
  }
}
