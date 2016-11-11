import { RECEIVE_ALL_WORKSPACES,
         RECEIVE_WORKSPACE,
         REMOVE_WORKSPACE } from '../actions/workspace_actions';
import { RECEIVE_PROJECT } from '../actions/project_actions'
import merge from 'lodash/merge';

const WorkspacesReducer = (oldState = {}, action) => {
  let newState = merge({}, oldState);
  switch (action.type) {
    case RECEIVE_ALL_WORKSPACES:
      return merge({}, action.workspaces);
    case RECEIVE_WORKSPACE:
      return merge({}, {[action.workspace.id]: action.workspace});
    case REMOVE_WORKSPACE:
      delete newState[action.workspace.id];
      return newState;
    case RECEIVE_PROJECT:
      let id = Object.keys(newState);

      if (newState[id]) {
        let projectIds = newState[id].projects.map((project) => project.id)
        if (!projectIds.includes(action.project.id)) {
          newState[id].projects.push(action.project);
        }
      }

      return newState;
    default:
      return oldState;
  }
};

export default WorkspacesReducer;
