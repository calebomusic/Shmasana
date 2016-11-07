export const RECEIVE_TASK = 'RECEIVE_TASK';
export const RECEIVE_TASKS = 'RECEIVE_TASKS';
export const DELETE_TASK = 'DELETE_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';
export const CREATE_TASK = 'CREATE_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const FETCH_TASK = 'FETCH_TASK';
export const FETCH_TASKS_BY_WORKSPACE = 'FETCH_TASKS_BY_WORKSPACE';
export const FETCH_TASKS_BY_PROJECT = 'FETCH_TASKS_BY_PROJECT';
export const FETCH_TASKS_BY_USER = 'FETCH_TASKS_BY_USER';
export const FETCH_TASKS_BY_USER_AND_PROJECT = 'FETCH_TASKS_BY_USER_AND_PROJECT';
export const FETCH_TASKS_BY_USER_AND_WORKSPACE = 'FETCH_TASKS_BY_USER_AND_WORKSPACE';

export const receiveTask = (task) => (
  {
    type: RECEIVE_TASK,
    task
  }
)
export const receiveTasks = (tasks) => (
  {
    type: RECEIVE_TASKS,
    tasks
  }
)
export const removeTask = () => (
  {
    type: REMOVE_TASK
  }
)
export const createTask = (task) => (
  {
    type: CREATE_TASK,
    task
  }
)
export const updateTask = (task) => (
  {
    type: UPDATE_TASK,
    task
  }
)

export const deleteTask = (id) => (
  {
    type: DELETE_TASK,
    id
  }
)

export const fetchTask = (id) => (
  {
    type: FETCH_TASK,
    id
  }
)

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