import { connect } from 'react-redux';
import SideBar from './sidebar';
import { closeSidebar } from '../../actions/sidebar_actions';
import { createProject,
  receiveProject,
  fetchProject,
  removeProject } from '../../actions/project_actions';


const mapStateToProps = (state) => {
  return({
    // user projects
    // user team mates
    currentUser: state.session.currentUser,
    sidebar: state.sidebar,
    project: state.project,
    workspace: state.workspace[Object.keys(state.workspace)]
  })
}

const mapDispatchToProps = (dispatch) => {
  // debugger
  return({
    closeSidebar: () => dispatch(closeSidebar()),
    createProject: (project) => dispatch(createProject(project)),
    receiveProject: (project) => dispatch(receiveProject(project)),
    fetchProject: (project) => dispatch(fetchProject(project)),
    removeProject: () => dispatch(removeProject())
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(SideBar);
