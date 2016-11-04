import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory, IndexRoute} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './app';
import SessionFormContainer from './session/session_form_container';
import SignUpHomeContainer from './session/signup_home_container'

import { receiveErrors } from '../actions/session_actions';

const Root = ({ store }) => {

  const _redirectIfLoggedInAndClearErrors = () => {
      let currentUser = store.getState().session.currentUser
      if(currentUser) {
        // fix this to redirect to user/workspace
        hashHistory.replace(`/${currentUser.id}/1`);
      }
      _clearErrors()
  }

  const _clearErrors = () => {
    store.dispatch(receiveErrors({errors: []}))
  }

  const _redirectToSignUpHomeIfNotLoggedIn = () => {
    if(store.getState().session.currentUser === null) {
      hashHistory.replace('/')
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
