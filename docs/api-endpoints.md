# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

## JSON API

### Users

- `POST /api/users`
- `PATCH /api/users`

### Session

- `POST /api/session`
- `DELETE /api/session`
- `GET /api/session`

### Workspaces
- `GET /api/workspaces`
- `POST /api/workspaces`
- `GET /api/workspaces/:id`

Ken: Didn't see any reference to notes in your MVP
- `PATCH /api/notes/:id`
- `DELETE /api/notes/:id`
- `GET /api/workspaces/:id/projects/`
  -index of all projects for a workspace

## Projects
- `GET /api/projects`
- `GET /api/projects/:id`
- `POST /api/workspaces/:id/projects`
- `PATCH /api/workspaces/:id/projects/:id`
- `DELETE /api/projects/:id`
- `GET /api/projects/:id/tasks`
  -index of all tasks for a project

### Tasks

- `GET /api/tasks`
- `POST /api/projects/:id/tasks`
- `GET /api/tasks/:id`
- `DELETE /api/tasks/:id`
- `GET /api/tasks/:id/comments`
  - index of all comments for a task
- `GET /api/tasks/:id/tags`
  - index of all tags for a task

### Tags

- `GET /api/tags`
- `POST /api/tasks/:task_id/tags`
- `DELETE /api/tasks/:task_id/tags/:id`

### Comments

- `POST /api/tasks/:task_id/comments`
- `PATCH /api/tasks/:task_id/comments/:comment_id`
- `DELETE /api/tasks/:task_id/comments`
