import { applyMiddleware } from 'redux';
import Logger from 'redux-logger';

import SessionMiddleware from './session_middleware';
import WorkspaceMiddleware from './workspace_middleware';
import ProjectMiddleware from './project_middleware';
import TaskMiddleware from './task_middleware';
import TasksMiddleware from './tasks_middleware';
import CommentMiddleware from './comment_middleware';

export default applyMiddleware(SessionMiddleware,
  WorkspaceMiddleware,
  ProjectMiddleware,
  TaskMiddleware,
  TasksMiddleware,
  CommentMiddleware,
  Logger()
);
