import { connect } from 'react-redux';
import Header from './header';
import { logout } from '../../actions/session_actions';
import { createWorkspace, fetchWorkspaces, fetchWorkspace } from '../../actions/workspace_actions';
import { openSidebar } from '../../actions/sidebar_actions'
import { createTask } from '../../actions/task_actions'
import { createProject, removeProject } from '../../actions/project_actions'

const mapStateToProps = (state) => {
  return({
    currentUser: state.session.currentUser,
    workspace: state.workspace[Object.keys(state.workspace)],
    sidebar: state.sidebar,
    project: state.project
  })
}


const mapDispatchToProps = (dispatch) => (
  // fetch user's teams?
  {
    logout: () => dispatch(logout()),
    createTask: (task) => dispatch(createTask(task)),
    createWorkspace: (workspace) => dispatch(createWorkspace(workspace)),
    fetchWorkspace: (id) => dispatch(fetchWorkspace(id)),
    fetchWorkspaces: () => dispatch(fetchWorkspaces()),
    openSidebar: () => dispatch(openSidebar()),
    removeProject: () => dispatch(removeProject()),
    createProject: (project) => dispatch(createProject(project))
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Header);
