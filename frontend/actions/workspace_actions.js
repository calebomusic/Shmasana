export const FETCH_WORKSPACES = 'FETCH_WORKSPACES'
export const FETCH_WORKSPACE = 'FETCH_WORKSPACE'
export const RECEIVE_ALL_WORKSPACES = 'RECEIVE_ALL_WORKSPACES'
export const RECEIVE_WORKSPACE = 'RECEIVE_WORKSPACE'
export const REMOVE_WORKSPACE = 'REMOVE_WORKSPACE'
export const CREATE_WORKSPACE = 'CREATE_WORKSPACE'
export const UPDATE_WORKSPACE = 'UPDATE_WORKSPACE'
export const DELETE_WORKSPACE = 'DELETE_WORKSPACE'

export const fetchWorkspaces = () => (
  {
    type: FETCH_WORKSPACES
  }
)
export const fetchWorkspace = (id) => (
  {
    type: FETCH_WORKSPACE,
    id
  }
)
export const createWorkspace = (workspace) => (
  {
    type: CREATE_WORKSPACE,
    workspace
  }
)
export const updateWorkspace = (workspace) => (
  {
    type: UPDATE_WORKSPACE,
    workspace
  }
)
export const deleteWorkspace = (id) => (
  {
    type: DELETE_WORKSPACE,
    id
  }
)
export const receiveAllWorkspaces = (workspaces) => (
  {
    type: RECEIVE_ALL_WORKSPACES,
    workspaces
  }
)
export const receiveWorkspace = (workspace) => (
  {
    type: RECEIVE_WORKSPACE,
    workspace
  }
)
export const removeWorkspace = (workspace) => (
  {
    type: REMOVE_WORKSPACE,
    workspace
  }
)
