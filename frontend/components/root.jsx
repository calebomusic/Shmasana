import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import App from './app';
import SessionFormContainer from './session/session_form_container';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const _redirectIfLoggedIn = () => {
  if(window.currentUser) {
    hashHistory.replace('/');
  }
}

const Root = ({ store }) => (
  <MuiThemeProvider>
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App} >
      <Route path="/login"
        component={SessionFormContainer}
        onEnter={_redirectIfLoggedIn}></Route>
      <Route path="/signup"
        component={SessionFormContainer}
        onEnter={_redirectIfLoggedIn}></Route>
      </Route>
    </Router>
  </Provider>
  </MuiThemeProvider>
);

export default Root
