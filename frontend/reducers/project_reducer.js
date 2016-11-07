import { RECEIVE_PROJECT, REMOVE_PROJECT } from '../actions/project_actions';
import merge from 'lodash/merge';

const ProjectReducer = (oldState = {}, action) => {
  let newState
  switch (action.type) {
    case RECEIVE_PROJECT:
      return action.project;
    case REMOVE_PROJECT:
      return {};
    default:
      return oldState;
  }
}

export default ProjectReducer;
