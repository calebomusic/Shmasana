import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './app';
import SessionFormContainer from './session/session_form_container';
import SignUpHomeContainer from './session/signup_home_container'

import { receiveErrors } from '../actions/session_actions';

const Root = ({ store }) => {

  const _redirectIfLoggedInAndClearErrors = () => {
      if(store.getState().session.currentUser) {
        hashHistory.replace('/');
      }
      _clearErrors()
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
        onEnter={_redirectIfLoggedInAndClearErrors}></Route>
      <Route path="/login"
        component={SessionFormContainer}
        onEnter={_redirectIfLoggedInAndClearErrors}
        ></Route>
    </Router>
  </Provider>
  </MuiThemeProvider>);
};

export default Root
