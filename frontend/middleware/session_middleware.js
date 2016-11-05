import { receiveCurrentUser,
         receiveErrors,
         LOGIN,
         LOGOUT,
         SIGNUP
       } from '../actions/session_actions';

import { login, signup, logout } from '../util/session_api_util';
// May not need all of the below
import { createWorkspace, fetchUserWorkspaces, fetchUserWorkspaceOnLogin } from '../actions/workspace_actions';

import { hashHistory } from 'react-router';

export default (store) => (next) => (action) => {

  const successfulLogin = (user) => {
    store.dispatch(receiveCurrentUser(user));
    const workspaceId = user.workspaces[0];
    store.dispatch(fetchUserWorkspaceOnLogin(workspaceId));
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
