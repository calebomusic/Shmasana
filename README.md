# Shmasana

[Shmasana live](http://shmasana.herokuapp.com/)
![Shmasana!](http://)

Shmasana is a single-page full-stack web application inspired by Asana. It has all the features of a complete taks management systems allowing users to create tasks, projects, workspaces and invite other users to their workspaces.

It is made with Ruby on Rails on the backend, a PostgresSQL database, and React.js with a Redux architectural framework on the frontend.

## Architecture & Implementation

This section describes the frontend application state, the Implementation of optimistic updating, the structure of `Users`, `Workspaces`, and `Tasks`.

### Application State

Following the Redux framework, there is a single source of truth, the application state. Application state includes the loading state, current project, current user, sidebar state, current task, tasks, view, and current workspace. The user, project, task, and workspace slices of state hold the respective properties and association info typically the primary key (associations are described in greater detail below). All the workspace tasks are held in state to avoid additional AJAX requests and enable fluid transitions between views. The task includes the present task and past task actions to support optimistic updating.

An example application state is:

```javascript
  {
    loading: false,
    project: {
      id: 1,
      name: "Spaceship",
      tasks: Array[9],
      workspace_id: 1
    },
    session: {
      CurrentUser: {
        assigned_tasks: [ 4, 6, 8, ... ]
        created_tasks: [ 14, 19, 20, ...],
        id: 2,
        projects: Array[6],
        username: "Charles",
        workspaces: [1, 2, 3]
      }
    },
    sidebar: true,
    task: {
      past: Array[1],
      present: {
        assignee:Object
        assignee_id:2
        author:Object
        author_id:2
        comments:Array[2]
        completed:true
        completed_at:"1996-10-03T16:16:15.374Z",
        created_at:"2016-12-03T01:28:31.166Z", description: "Avoid space horror",due_date:null,
        id:22,
        project:Object,
        project_id:1,
        title:"Collect movie titles for the trip",
        workspace_id:1
    },
    tasks: Array[9],
    view: 'all',
    workspace: {
      1:
        {
          id: 1,
          name: "Occupy Mars",
          projects: Array[6],
          tasks: Array[42],
          team: Array[7],
          users: Array[7]
        }
    }

  }
```

### Optimistic Updating

Shmasana optimistically updates on title and description changes for a task, allowing users to edit tasks seamlessly without interruption.

Optimistic updating is enabled by utilizing a higher-order reducer `OptimisticReducer` which wraps around `TaskReducer`:

```javascript
const OptimisticReducer = (reducer) => {
  return (oldState = { past: [], present: {}}, action) => {
    let newState = merge({}, oldState)
    switch (action.status) {
      case BEGIN:
        return {
          past: [ ...newState.past, action],
          present: reducer(newState, action)
        }
      case END:
        newState.past.shift();
        return newState;
      case REVERT:
        const prevAction = newState.past[newState.past.length - 1];
        return {
          past: [],
          present: reducer(newState, prevAction)
        }
      default:
        return oldState;
    }
  }
}
```

The `OptimisticReducer` stores the past task actions. `present` returns the present task state. On change of a task's properties the `updateTask` action is dispatched. This action hits the middleware which dispatches `receiveTaskBegin` and makes an AJAX request:

```javascript
const TaskMiddleware = store => next => action => {
  ...
  switch (action.type) {
    case UPDATE_TASK:
      store.dispatch(receiveTaskBegin(action.task));
      updateTask(action.task, action.task.workspace_id, successfulUpdate, revertOnError);
    return next(action);
    ...
  }
}
```

`receiveTaskBegin` is passed to the `OptimisticReducer` which stores the action due to the status payload and passes the action to the `TaskReducer` which updates the store. The AJAX request receives successfulUpdate as a success callback which dispatches `receiveTaskEnd`. Because `receiveTaskEnd`carries the status `END` the earliest `receiveTaskBegin` action is removed from the past array. The error callback, `revertOnError` will dispatch the last action stored in past array.


![Shmasana provides a framework to get things done](http://)

### Users and Workspaces

The next sections describe the implemented associations.

Users and Workspaces stand in a many to many relationship. Workspaces then mimic Asana's team functionality, a workspace may have many members, members may be invited to workspaces, and they may create projects and tasks in such workspaces. `joinUserWorkspace` joins Users and Workspaces on `workspace_id` and `user_id` respectively. Users then access projects through workspaces. In the user model the associations are:

```ruby
has_many :join_user_workspaces
has_many :workspaces,
  through: :join_user_workspaces,
  source: :workspace

has_many :projects,
  through: :workspaces,
  source: :projects

has_many :assigned_tasks,
  class_name: :Task,
  foreign_key: :assignee_id

has_many :created_tasks,
  class_name: :Task,
  foreign_key: :author_id

has_many :comments, foreign_key: :author_id
```

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
Tasks may also have titles, descriptions, due dates, and may or may not be completed. In the `Task` model the associations are instantiated as follows:

```ruby
  belongs_to :author, class_name: :User
  belongs_to :project
  belongs_to :workspace
  belongs_to :assignee, class_name: :User
  has_one :workspace, through: :project
  has_many :comments, class_name: :Comment
```

Users are allowed to mark tasks in their workspace complete, assign tasks to other users, or invite other users to the workspace.

Tasks need not be assigned to a project, project-less tasks reside in the workspace route: `/:userId/:workspaceId/list/:taskId`

![Shmasana supports comments](http://)

## Future Directions for the Project

In addition to the features already implemented, I plan to continue work on this project.  The next steps for Shmasana are:

### Email Invite

Users may add other users to their workspace, but no email confirmation is involved. Email confirmation will be utilized with ActionMailer and Sendgrid.

### Search

Users will be able to search for tasks by their description, title, and tags.
