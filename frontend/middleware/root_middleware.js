import { applyMiddleware } from 'redux';
import SessionMiddleware from './session_middleware';
import WorkspaceMiddleware from './workspace_middleware';
import ProjectMiddleware from './project_middleware';

export default applyMiddleware(SessionMiddleware,
  WorkspaceMiddleware,
  ProjectMiddleware
);
