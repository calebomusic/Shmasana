import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';

import injectTapEventPlugin from 'react-tap-event-plugin';
import Modal from 'react-modal';

import { fetchProjectsByWorkspace } from './util/project_api_util'

import { logout } from './actions/session_actions'

import {
  createProject,
} from './actions/project_actions';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

document.addEventListener('DOMContentLoaded', () => {
  let store;

  if(window.currentUser) {
    store = configureStore({session: {currentUser: window.currentUser}});
  } else {
    store = configureStore();
  }


  Modal.setAppElement(document.body)

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);

  // TODO: testing
  window.store = store
  window.state = store.getState()
  window.logout = logout;
  window.project = () => store.dispatch(createProject({name: 'new project', workspace_id: 18}))
  window.fetch = () => fetchProjectsByWorkspace(18, (p) => ( console.log(p)))
})
