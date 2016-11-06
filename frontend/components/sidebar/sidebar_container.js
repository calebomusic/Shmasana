import { connect } from 'react-redux';
import SideBar from './sidebar';
import { closeSidebar } from '../../actions/sidebar_actions';
import { createProject, receiveProject, fetchProject } from '../../actions/project_actions';


const mapStateToProps = (state) => {
  // debugger
  return({
    // user projects
    // user team mates
    sidebar: state.sidebar,
    project: state.project
  })
}

const mapDispatchToProps = (dispatch) => (
  {
    // logout: () => dispatch(logout())
    closeSidebar: () => dispatch(closeSidebar()),
    createProject: (project) => dispatch(createProject(project)),
    receiveProject: (project) => dispatch(receiveProject(project)),
    fetchProject: (project) => dispatch(fetchProject(project))
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps)(SideBar);
