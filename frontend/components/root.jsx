import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import App from './app';
import SessionFormContainer from './session/session_form_container';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Root = ({ store }) => {

  const _redirectIfLoggedIn = () => {
      if(store.getState().currentUser) {
        hashHistory.replace('/');
      }
  }

  return(<MuiThemeProvider>
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App} ></Route>
      <Route path="/login"
        component={SessionFormContainer}
        onEnter={_redirectIfLoggedIn(store)}></Route>
      <Route path="/signup"
        component={SessionFormContainer}
        onEnter={_redirectIfLoggedIn(store)}></Route>
    </Router>
  </Provider>
  </MuiThemeProvider>);
};

export default Root
