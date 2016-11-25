export const FETCH_TASKS_BY_WORKSPACE = 'FETCH_TASKS_BY_WORKSPACE';
export const FETCH_TASKS_BY_PROJECT = 'FETCH_TASKS_BY_PROJECT';
export const FETCH_TASKS_BY_USER = 'FETCH_TASKS_BY_USER';
export const FETCH_TASKS_BY_USER_AND_PROJECT = 'FETCH_TASKS_BY_USER_AND_PROJECT';
export const FETCH_TASKS_BY_USER_AND_WORKSPACE = 'FETCH_TASKS_BY_USER_AND_WORKSPACE';

export const fetchTasksByWorkspace = (workspaceId) => (
  {
    type: FETCH_TASKS_BY_WORKSPACE,
    workspaceId
  }
)
export const fetchTasksByProject = (projectId) => (
  {
    type: FETCH_TASKS_BY_PROJECT,
    projectId
  }
)
export const fetchTasksByUser = (userId) => (
  {
    type: FETCH_TASKS_BY_USER,
    userId
  }
)
export const fetchTasksByUserAndProject = (userId, projectId) => (
  {
    type: FETCH_TASKS_BY_USER_AND_PROJECT,
    userId,
    projectId
  }
)

export const fetchTasksByUserAndWorkspace = (userId, workspaceId) => (
  {
    type: FETCH_TASKS_BY_USER_AND_WORKSPACE,
    userId,
    workspaceId
  }
)
