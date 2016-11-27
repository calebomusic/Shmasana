import { BEGIN, END, REVERT } from '../actions/task_actions';
import { merge } from 'lodash';

const OptimisticReducer = (reducer) => {
  return (oldState = { past: [], present: {}}, action) => {
    let newState = merge({}, oldState)
    switch (action.status) {
      case BEGIN:
        return {
          past: [ ...newState, action],
          present: reducer(newState, action)
        }
      case END:
        return {
          past: [],
          present: newState.present
        }
      case REVERT:
        const prevAction = newState.past[newState.past.length - 1];
        return {
          past: [],
          present: reducer(newState, prevAction)
        }
      default:
        return oldState;
    }
  }
}


export default OptimisticReducer;
