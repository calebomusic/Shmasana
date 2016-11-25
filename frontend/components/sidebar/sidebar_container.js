import { connect } from 'react-redux';

import SideBar from './sidebar';

import { closeSidebar } from '../../actions/sidebar_actions';
import { createProject,
         receiveProject,
         fetchProject,
         removeProject } from '../../actions/project_actions';
import { updateWorkspace,
         fetchWorkspace } from '../../actions/workspace_actions';
import { fetchTasksByProject } from '../../actions/tasks_actions';

const mapStateToProps = (state) => (
  {
    currentUser: state.session.currentUser,
    sidebar: state.sidebar,
    project: state.project,
    workspace: state.workspace[Object.keys(state.workspace)]
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    closeSidebar: () => dispatch(closeSidebar()),
    createProject: project => dispatch(createProject(project)),
    receiveProject: project => dispatch(receiveProject(project)),
    fetchProject: project => dispatch(fetchProject(project)),
    removeProject: () => dispatch(removeProject()),
    updateWorkspace: (workspace) => dispatch(updateWorkspace()),
    fetchWorkspace: id => dispatch(fetchWorkspace(id)),
    fetchTasksByProject: projectId => dispatch(fetchTasksByProject(projectId))
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps)(SideBar);
