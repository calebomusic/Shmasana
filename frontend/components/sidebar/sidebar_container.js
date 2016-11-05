import { connect } from 'react-redux';
import SideBar from './sidebar';
import { closeSidebar } from '../../actions/sidebar_actions'


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
    closeSidebar: () => dispatch(closeSidebar())
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps)(SideBar);
