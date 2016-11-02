import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './app';
import SessionFormContainer from './session/session_form_container';
import SignUpHomeContainer from './session/signup_home_container'

import { receiveErrors } from '../actions/session_actions';

const Root = ({ store }) => {

  const _redirectIfLoggedIn = () => {
      if(store.getState().session.currentUser) {
        hashHistory.replace('/');
      }
  }

  const _clearErrors = () => {
    store.dispatch(receiveErrors({errors: []}))
  }

  return(<MuiThemeProvider>
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App} ></Route>
      <Route path="/signup"
        component={SignUpHomeContainer}
        onEnter={_redirectIfLoggedIn(store)}
        onEnter={_clearErrors}></Route>
      <Route path="/login"
        component={SessionFormContainer}
        onEnter={_redirectIfLoggedIn(store)}
        onEnter={_clearErrors}></Route>
    </Router>
  </Provider>
  </MuiThemeProvider>);
};

export default Root
