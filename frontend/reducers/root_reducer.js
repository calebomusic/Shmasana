import { combineReducers } from 'redux';
import SessionReducer from './session_reducer';
import WorkspacesReducer from './workspaces_reducer';
import SidebarReducer from './sidebar_reducer';
import ProjectReducer from './project_reducer';
import TaskReducer from './task_reducer';
import TasksReducer from './tasks_reducer';

const RootReducer = combineReducers({
  session: SessionReducer,
  workspace: WorkspacesReducer,
  sidebar: SidebarReducer,
  project: ProjectReducer,
  task: TaskReducer,
  tasks: TasksReducer
})

export default RootReducer;
