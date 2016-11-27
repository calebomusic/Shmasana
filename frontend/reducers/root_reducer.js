import { combineReducers } from 'redux';
import SessionReducer from './session_reducer';
import WorkspacesReducer from './workspaces_reducer';
import SidebarReducer from './sidebar_reducer';
import ProjectReducer from './project_reducer';
import TaskReducer from './task_reducer';
import TasksReducer from './tasks_reducer';
import ViewReducer from './view_reducer';
import MainContentSpinnerReducer from './main_content_spinner_reducer';
import OptimisticReducer from './optimistic_reducer';

const RootReducer = combineReducers({
  session: SessionReducer,
  workspace: WorkspacesReducer,
  sidebar: SidebarReducer,
  project: ProjectReducer,
  task: OptimisticReducer(TaskReducer),
  tasks: TasksReducer,
  view: ViewReducer,
  loading: MainContentSpinnerReducer,
});

export default RootReducer;
