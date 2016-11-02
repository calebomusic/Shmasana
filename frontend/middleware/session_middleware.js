import { receiveCurrentUser,
         receiveErrors,
         LOGIN,
         LOGOUT,
         SIGNUP
       } from '../actions/session_actions';

import { login, signup, logout } from '../util/session_api_util';
import { hashHistory } from 'react-router';


export default ({getstate, dispatch}) => (next) => (action) => {

  const success = (user) => {
    dispatch(receiveCurrentUser(user));
    // TODO: replace to this route?
    hashHistory.push('/0');
  }

  const successfulLogout = (user) => {}

  const errors = (errors) => dispatch(receiveErrors(errors))

  switch (action.type) {
    case LOGIN:
      login(action.user, success, errors);
      return next(action);
    case LOGOUT:
      logout(successfulLogout, errors);
      return next(action);
    case SIGNUP:
      signup(action.user, success, errors);
      return next(action);
    default:
      return next(action);
  }
}
