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

import { createTask, updateTask, fetchTasksByProject } from './actions/task_actions';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

document.addEventListener('DOMContentLoaded', () => {
  let store;
  console.log("Thanks for checking out Shmasana! Add some new tasks and check them off.");
  console.log("I'm currently looking for new oppurtunities, checkout my LinkedIn here: https://www.linkedin.com/in/caleb-ontiveros");
  console.log("And porfolio here: calebomusic.github.io.");
  if(window.currentUser) {
    store = configureStore({session: {currentUser: window.currentUser}});
  } else {
    store = configureStore();
  }


  Modal.setAppElement(document.body);

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
})
