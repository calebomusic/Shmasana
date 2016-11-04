import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory, IndexRoute} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './app';
import SessionFormContainer from './session/session_form_container';
import SignUpHomeContainer from './session/signup_home_container'

import { receiveErrors } from '../actions/session_actions';
import { fetchUserWorkspacesOnLogin } from '../actions/workspace_actions';

const Root = ({ store }) => {

  const _redirectIfLoggedInAndClearErrors = () => {
      let currentUser = store.getState().session.currentUser
      if(currentUser) {
        store.dispatch(fetchUserWorkspacesOnLogin(currentUser.id))
      }
      _clearErrors()
  }

  const _clearErrors = () => {
    store.dispatch(receiveErrors({errors: []}))
  }

  const _redirectToSignUpHomeIfNotLoggedIn = () => {
    const currentUser = store.getState().session.currentUser
    if(!currentUser) {
      hashHistory.replace('/')
    } else if(!store.getState().workspace || !store.getState().workspace.name) {
      store.dispatch(fetchUserWorkspacesOnLogin(currentUser.id))
    }
  }

  return(<MuiThemeProvider>
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={SignUpHomeContainer}
        onEnter={_redirectIfLoggedInAndClearErrors}></Route>
      <Route path="/login"
        component={SessionFormContainer}
        onEnter={_redirectIfLoggedInAndClearErrors}
        ></Route>
      <Route path="/:userId"
        onEnter={_redirectToSignUpHomeIfNotLoggedIn}>
        <Route path="/:userId/:workspaceId" component={App}
          onEnter={_redirectToSignUpHomeIfNotLoggedIn}> </Route>
      </Route>
    </Router>
  </Provider>
  </MuiThemeProvider>);
};

// is the user path necessary?
export default Root
