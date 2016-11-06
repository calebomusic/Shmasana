export const FETCH_PROJECT = 'FETCH_PROJECT';
export const RECEIVE_PROJECT = 'RECEIVE_PROJECT';
export const FETCH_PROJECTS_BY_WORKSPACE = 'FETCH_PROJECTS_BY_WORKSPACE';
export const CREATE_PROJECT = 'CREATE_PROJECT';

export const fetchProject = (id) => (
  {
    type: FETCH_PROJECT,
    id
  }
)

// Will is use this?

export const fetchProjectsByWorkspace = (workspaceId) => (
  {
    type: FETCH_PROJECTS_BY_WORKSPACE,
    workspaceId
  }
)


export const createProject = (project) => (
  {
    type: CREATE_PROJECT,
    project
  }
)

export const receiveProject = (project) => (
  {
    type: RECEIVE_PROJECT,
    project
  }
)
