import { RECEIVE_PROJECT } from '../actions/project_actions';
import merge from 'lodash/merge';

const ProjectReducer = (oldState = {}, action) => {
  let newState

  switch (action.type) {
    case RECEIVE_PROJECT:
      console.log(merge({}, {[action.project.id]: action.project}));
      return merge({}, {[action.project.id]: action.project})
    default:
      return oldState;
  }
}

export default ProjectReducer;
