import { combineReducers } from 'redux';
import SessionReducer from './session_reducer';
import WorkspacesReducer from './workspaces_reducer';
import SidebarReducer from './sidebar_reducer';

const RootReducer = combineReducers({
  session: SessionReducer,
  workspace: WorkspacesReducer,
  sidebar: SidebarReducer
})

export default RootReducer;
