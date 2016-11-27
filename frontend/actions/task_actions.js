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
export const UPDATE_AND_FETCH = 'UPDATE_AND_FETCH';
export const BEGIN = 'BEGIN';
export const END = 'END';
export const REVERT = 'REVERT';
export const STATUS = 'STATUS';

export const receiveTask = (task) => (
  {
    type: RECEIVE_TASK,
    task,
    status: BEGIN
  }
)

export const receiveTaskBegin = (task) => (
  {
    type: RECEIVE_TASK,
    task,
    status: BEGIN
  }
)

export const receiveTaskEnd = (task) => (
  {
    type: RECEIVE_TASK,
    task,
    status: END
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

export const updateTaskAndFetch = (task) => (
  {
    type: UPDATE_AND_FETCH,
    task
  }
)

export const end = () => (
  {
    type: STATUS,
    status: END
  }
)

export const revert = () => (
  {
    type: STATUS,
    status: REVERT
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
