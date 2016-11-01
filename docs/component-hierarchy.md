## Component Hierarchy

**SessionFormContainer**
 - SessionForm

**App**
  -HeaderContainer
  -SideBarContainer
  -TasksContainer

**SideBarContainer**
 - Team Members Index
 - Project Index

**HeaderContainer**
 - Action Dropdown
 - User Dropdown

**TasksContainer**
 - Sub Header
  * Task List
    + Task
    + Task Details
      - Tags
      - Comments
      - Create Comment

**ProjectContainer**
 - Subheader
  * Project Task List
    + ...

**SearchContainer**
 - Subheader
  * Project Task List
    + ...


## Routes

|Path   | Component   |
|-------|-------------|
| "/sign-up" | "SessionFormContainer" |
| "/sign-in" | "SessionFormContainer" |
| "/" | "AppContainer" |
| "/workspaceId" | "TaskList" |
| "/workspaceId/taskId" | "TaskDetails" |
| "/workspaceId/projectId" | "ProjectContainer" |
| "/workspaceId/projectId/taskId" | "TaskDetails" |
| "/workspaceId/Search/" | "SearchContainer" |
| "/workspaceId/SearchId/taskId" | "TaskDetails" |
