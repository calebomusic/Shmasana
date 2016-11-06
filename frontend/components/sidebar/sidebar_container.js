import { connect } from 'react-redux';
import SideBar from './sidebar';
import { closeSidebar } from '../../actions/sidebar_actions';
import { createProject } from '../../actions/project_actions';


const mapStateToProps = (state) => (
  {
    // user projects
    // user team mates
    sidebar: state.sidebar
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    // logout: () => dispatch(logout())
    closeSidebar: () => dispatch(closeSidebar()),
    createProject: (project) => dispatch(createProject(project))
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps)(SideBar);
