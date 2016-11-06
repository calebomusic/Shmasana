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

// import { createTask, updateTask, fetchTasksByWorkspace,
//   fetchTasksByProject, fetchTasksByUser, fetchTasksByUserAndProject,
//   fetchTask} from './util/task_api_util'

import { createTask, updateTask, fetchTasksByProject } from './actions/task_actions';

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
  window.state = store.getState
  window.logout = logout;
  window.project = () => store.dispatch(createProject({name: 'newer project', workspace_id: 20}))
  window.fetch = () => fetchProjectsByWorkspace(18, (p) => ( console.log(p)))

  window.createTask = () => store.dispatch(createTask({project_id: 4, title: 'new task', author_id: 5, assignee_id: 5 }))
  window.updateTask = () => store.dispatch(updateTask({project_id: 4, title: 'Updated Task', author_id: 5, assignee_id: 5 }))
  window.fetchTasksByProject = () => store.dispatch(fetchTasksByProject(4))
  // window.createTask = () => (createTask({project_id: 4, title: 'new task', author_id: 5, assignee_id: 5 }, 4, (task) => (console.log(task))))
  // window.updateTask = () => updateTask({project_id: 4, title: 'updated task once more', author_id: 4, assignee_id: 5}, 4, (task) => (console.log(task)))
  // window.fetchTasksByProject = () => fetchTasksByProject(4, (task) => (console.log(task)))
  // window.fetchTasksByUser = () => fetchTasksByUser(5, (task) => (console.log(task)))
  // window.fetchTasksByUserAndProject = () => fetchTasksByUserAndProject(5, 4, (task) => (console.log(task)))
})
