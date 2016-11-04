import { receiveCurrentUser,
         receiveErrors,
         LOGIN,
         LOGOUT,
         SIGNUP
       } from '../actions/session_actions';

import { login, signup, logout } from '../util/session_api_util';
import { createWorkspace, fetchUserWorkspaces, fetchUserWorkspacesOnLogin } from '../actions/workspace_actions';

import { hashHistory } from 'react-router';

export default (store) => (next) => (action) => {

  // Fix path here.
  const successfulLogin = (user) => {
    store.dispatch(receiveCurrentUser(user));
    store.dispatch(fetchUserWorkspacesOnLogin(user.id));
  }

  const successfulSignup = (user) => {
    store.dispatch(receiveCurrentUser(user));
    store.dispatch(createWorkspace({name: user.username}))
  }
  const successfulLogout = (user) => {}

  const errors = (errors) => store.dispatch(receiveErrors(errors))

  switch (action.type) {
    case LOGIN:
      login(action.user, successfulLogin, errors);
      return next(action);
    case LOGOUT:
      logout(successfulLogout, errors);
      return next(action);
    case SIGNUP:
      signup(action.user, successfulSignup, errors);
      return next(action);
    default:
      return next(action);
  }
}
