import { RECEIVE_VIEW } from '../actions/view_actions';


const ViewReducer = (oldState = 'all', action) => {
  switch (action.type) {
    case RECEIVE_VIEW:
      return action.view
    default:
      return oldState;
  }
};

export default ViewReducer;
