import { combineReducers } from 'redux';
import SessionReducer from './session_reducer';
import WorkspacesReducer from './workspaces_reducer';

const RootReducer = combineReducers({
  session: SessionReducer,
  workspace: WorkspacesReducer
})

export default RootReducer;
