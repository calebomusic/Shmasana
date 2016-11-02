import { connect } from 'react-redux';
import SideBarDrawer from './sidebar_drawer';


const mapStateToProps = ({session}) => (
  {
    // user projects
    // user team mates
  }
)


const mapDispatchToProps = (dispatch) => (
  {
    // logout: () => dispatch(logout())
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps)(SideBarDrawer);
