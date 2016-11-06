import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory, IndexRoute, withRouter} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './app';
import SessionFormContainer from './session/session_form_container';
import SignUpHomeContainer from './session/signup_home_container';
import ProjectsContainer from './project/project_container';
import TasksContainer from './tasks/tasks_container';

import { receiveErrors } from '../actions/session_actions';
import { fetchUserWorkspacesOnLogin, fetchUserWorkspaceOnLogin } from '../actions/workspace_actions';
import { fetchWorkspace } from '../util/workspace_api_util';

const Root = ({store}) => {

  const _redirectIfLoggedInAndClearErrors = () => {
      let currentUser = store.getState().session.currentUser
      if(currentUser) {
        const workspaceId = currentUser.workspaces[0]
        store.dispatch(fetchUserWorkspaceOnLogin(workspaceId))
      }
      _clearErrors()
  }

  const _clearErrors = () => {
    store.dispatch(receiveErrors({errors: []}))
  }

  // This is not woring.
  // Does this actually receive ownProps?
  const _redirectToSignUpHomeIfNotLoggedIn = (ownProps) => {
    const currentUser = store.getState().session.currentUser;
    const workspaceId = parseInt(ownProps.params.workspaceId)
    let workspace;
    if(!currentUser) {
      hashHistory.replace('/')
    }

    const fetchWorkspaceErrors = () => {
      const workspaceId = currentUser.workspaces[0]
      store.dispatch(fetchUserWorkspaceOnLogin(workspaceId))
    }

    fetchWorkspace(workspaceId, currentUser, () => {}, fetchWorkspaceErrors)
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
          onEnter={_redirectToSignUpHomeIfNotLoggedIn}>
          <Route path="/:userId/:workspaceId/:projectId" component={ProjectsContainer}>
            <Route path="/:userId/:workspaceId/:projectId/:taskId" component={TasksContainer} />
          </Route>
        </Route>
      </Route>
    </Router>
  </Provider>
  </MuiThemeProvider>);
};

// is the user path necessary?
export default Root;
