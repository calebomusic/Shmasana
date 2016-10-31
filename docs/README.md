# FresherNote
Ken: Wrong Name

[Heroku link][heroku]
[Trello link][trello]

[heroku]: http://www.herokuapp.com
[trello]: https://trello.com/b/sZQtNalX/shmasana

## Minimum Viable Product

Shmasana is a web application inspired by Asana built using Ruby on Rails
and React/Redux.  By the end of Week 9, this app will, at a minimum, satisfy the
following criteria with smooth, bug-free navigation, adequate seed data and
sufficient CSS styling:

- [ ] Hosting on Heroku
- [ ] A production README, replacing this README
- [ ] New account creation, login, and guest/demo login
- [ ] Workspaces
- [ ] Projects
- [ ] Tasks
- [ ] Profile for each user
- [ ] BONUS: Calendar, Search, Comments on Tasks

## Design Docs
* [View Wireframes][wireframes]
* [React Components][components]
* [API endpoints][api-endpoints]
* [DB schema][schema]
* [Sample State][sample-state]

[wireframes]: docs/wireframes
[components]: docs/component-hierarchy.md
[sample-state]: docs/sample-state.md
[api-endpoints]: docs/api-endpoints.md
[schema]: docs/schema.md

## Implementation Timeline

### Phase 1: Backend setup and Front End User Authentication (2 days)

**Objective:** Functioning rails project with front-end Authentication

### Phase 2: Workspaces Model, API, and components (2 days)

**Objective:** Workspaces can be created, read, edited and destroyed through
the API.

### Phase 3: Projects (1 day)

**Objective:** Projects belong to Workspaces. Projects can be created, read,
edited and destroyed through the API.

### Phase 4: Tasks (3 days)

**Objective:** Tasks belong to Projects. Tasks can be created, read, edited and destroyed through
the API. Tasks are displayed in lists. They can be sorted by completion status.

### Phase 5: User profiles (1 days, W2 F 4pm)

**objective:** Users are displayed by their workspace. Users can invite other users to a workspace.

### Bonus Features (TBD)
- [ ] Search tasks by title and description
- [ ] Support a calendar
- [ ] Comments on tasks
- [ ] Tags on tasks
