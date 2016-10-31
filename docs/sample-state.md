{
  currentUser: {
    id: 1,
    username: "app-academy"
  },
  forms: {
    signUp: {errors: []},
    logIn: {errors: []}
  },
  workspaces: {
    1: {
      name: 'sample space',
      projects: {
        1: {
          name: 'sample project'
          workspace_id: 1
          tasks: {
            1: {
              author_id: 7,
              project_id: 1,
              team_id: 1,
              title: 'sample title for a sample task'
              description: 'great sample task'
              completed: false
              comments: {
                1: {
                  author_id: 3,
                  task_id: 1,
                  body: 'sample body'
                }
              }
            }
          }
        }
      }
    }
  }
}
