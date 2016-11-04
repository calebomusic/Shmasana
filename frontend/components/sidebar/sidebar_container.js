import { connect } from 'react-redux';
import SideBar from './sidebar';


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
  mapDispatchToProps)(SideBar);
