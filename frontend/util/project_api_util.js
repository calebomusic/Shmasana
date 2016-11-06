export const fetchProjectsByWorkspace = (workspaceId, success, errors) => {
  $.ajax({
    url: `api/workspaces/${workspaceId}/projects/`,
    success,
    errors
  })
}

export const createProject = (project, workspaceId, success, errors) => {
  $.ajax({
    url: `api/workspaces/${workspaceId}/projects`,
    type: 'post',
    data: {project},
    success,
    errors
  })
}

export const fetchProject = (id, success, errors) => {
  $.ajax({
    url: `api/workspaces/${workspace.id}/projects/${id}`,
    success,
    errors
  })
}



// May be unneccessary
// export const fetchProjects = (success, errors) => (
//   $.ajax({
//     url: `api/projects`,
//     success,
//     errors
//   })
// )

// export const deleteProject = (id, user, success, errors) => (
//   $.ajax({
//     url: `api/users/${user.id}/projects/${id}`,
//     type: 'delete',
//     success,
//     errors
//   })
// )

// export const updateProject = (id, user, success, errors) => (
//   $.ajax({
//     url: `api/users/${user.id}/projects/${id}`,
//     type: 'patch',
//     data: {project},
//     success,
//     errors
//   })
// )
