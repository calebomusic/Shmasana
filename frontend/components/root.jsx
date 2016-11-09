import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory, IndexRoute, withRouter} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { lightBlue200, lightBlue500, lightRed200 } from 'material-ui/styles/colors';

import App from './app';
import SessionFormContainer from './session/session_form_container';
import SignUpHomeContainer from './session/signup_home_container';
import ProjectsContainer from './project/project_container';
import TaskDetailContainer from './tasks/detail_container';
import { receiveErrors } from '../actions/session_actions';
import { fetchUserWorkspacesOnLogin, fetchUserWorkspaceOnLogin } from '../actions/workspace_actions';

import { fetchWorkspace } from '../actions/workspace_actions';
import { fetchProject, removeProject } from '../actions/project_actions';

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

  // This is not working
  const _redirectToSignUpHomeIfNotLoggedIn = (ownProps) => {
    const currentUser = store.getState().session.currentUser;
    const workspaceId = parseInt(ownProps.params.workspaceId)
    let workspace;
    // debugger
    if(!currentUser) {
      hashHistory.replace('/')
    } else if (!currentUser.workspaces.includes(workspaceId)) {
      hashHistory.push('/')
    }
  }

  const _redirectToSignUpHomeIfNotLoggedInAndFetchWorkspace = (nextState) => {
    const currentUser = store.getState().session.currentUser;
    const workspaceId = parseInt(nextState.params.workspaceId);

    debugger
    if(!currentUser) {
      hashHistory.replace('/')
    } else if (!currentUser.workspaces.includes(workspaceId)) {
      hashHistory.push('/');
    } else {
      debugger
      store.dispatch(fetchWorkspace(workspaceId));
      store.dispatch(removeProject());
    }
  }

  const _FetchProject = (nextState) => {
    const projectId = parseInt(nextState.params.projectId);
    store.dispatch(fetchProject(projectId))
  }

  return(<MuiThemeProvider muiTheme={muiTheme}>
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
          onEnter={_redirectToSignUpHomeIfNotLoggedInAndFetchWorkspace}>
          // May need to fetch project here
          <Route path="/:userId/:workspaceId/list/:taskId" component={TaskDetailContainer}
            />
          <Route path="/:userId/:workspaceId/:projectId" onEnter={_FetchProject}/>
          <Route path="/:userId/:workspaceId/:projectId/:taskId" component={TaskDetailContainer} onEnter={_FetchProject} />
        </Route>
      </Route>
    </Router>
  </Provider>
  </MuiThemeProvider>);
};


// ExampleTheme: https://github.com/callemall/material-ui/blob/master/src/styles/baseThemes/lightBaseTheme.js

const muiTheme = getMuiTheme({
  palette: {
    primaryColor: lightBlue200,
    secondaryColor: lightBlue500,
    accent1Color: lightBlue200,
    pickerHeaderColor: lightRed200
  },
  appBar: {
    height: 50,
  },
});
// is the user path necessary?
export default Root;
