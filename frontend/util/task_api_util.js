export const createTask = (task, workspaceId, success, errors) => {
  $.ajax({
    url: `api/workspaces/${workspaceId}/tasks`,
    type: 'post',
    data: {task},
    success,
    errors
  })
}

export const updateTask = (task, projectId, success, errors) => {
  $.ajax({
    url: `api/projects/${projectId}/tasks/${task.id}`,
    type: 'patch',
    data: {task},
    success,
    errors
  })
}

export const fetchTasksByWorkspace = (workspaceId, success, errors) => {
  $.ajax({
    url: `api/workspaces/${workspaceId}/tasks/`,
    success,
    errors
  })
}

export const fetchTasksByUserAndWorkspace = (userId, workspaceId, success, errors) => {
  $.ajax({
    url: `api/users/${userId}/workspaces/${workspaceId}/tasks`,
    success,
    errors
  })
}

export const fetchTasksByProject = (projectId, success, errors) => {
  $.ajax({
    url: `api/projects/${projectId}/tasks/`,
    success,
    errors
  })
}

export const fetchTasksByUser = (userId, success, errors) => {
  $.ajax({
    url: `api/users/${userId}/tasks/`,
    success,
    errors
  })
}

export const fetchTasksByUserAndProject = (userId, projectId, success, errors) => {
  $.ajax({
    url: `api/users/${userId}/projects/${projectId}/tasks`,
    success,
    errors
  })
}

export const fetchTask = (id, success, errors) => {
  $.ajax({
    url: `api/tasks/${id}`,
    success,
    errors
  })
}

export const deleteTask = (id, success, errors) => {
  $.ajax({
    type: 'delete',
    url: `api/tasks/${id}`,
    success,
    errors
  })
}
