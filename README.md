# Shmasana

[Shmasana live](http://shmasana.herokuapp.com/)

Shmasana is a single-page full-stack web application inspired by Asana!
It is made with Ruby on Rails on the backend, a PostgresSQL database, and React.js with a Redux architectural framework on the frontend.

## Features & Implementation

### Users and Workspaces

Users and Workspaces stand in a many to many relationship. Workspaces then mimic Asana's team functionality, a workspace may have many members,
members may be invited to workspaces, and they may create projects and tasks in such workspaces.

`joinUserWorkspace` joins Users and Workspaces on `workspace_id` and `user_id` respectively. Users then access projects through workspaces.

Upon successfully creating an account an workspace is created by dispatching the `createWorkspace` action which updates the frontend store and makes a request to create a workspace.
Upon successfully creating the workspace, the user is redirected to that workspace.

Successful signup callback:

```javascript
const successfulSignup = (user) => {
  store.dispatch(receiveCurrentUser(user));
  store.dispatch(createWorkspace({name: user.username}))
}
```

### Tasks

Upon arriving at a workspace the user may create additional workspaces, projects, and tasks.

Tasks must belong to a user via `author_id` and workspace via `workspace_id`.
They may be assigned to a user via `assignee_id`, a project via `project_id.`
Tasks may also have titles, descriptions, due dates, and may or may not be completed.

Users are allowed to mark tasks in their workspace complete, assign tasks to other users, or invite other users to the workspace.

Tasks need not be assigned to a project, project-less tasks reside in the workspace route: `/:userId/:workspaceId/list/:taskId`

## Future Directions for the Project

In addition to the features already implemented, I plan to continue work on this project.  The next steps for Shmasana are:

### Email Invite

Users may add other users to their workspace, but no email confirmation is involved. Email confirmation will be utilized with ActionMailer and Sendgrid.

### Search

Users will be able to search for tasks by their description, title, and tags.