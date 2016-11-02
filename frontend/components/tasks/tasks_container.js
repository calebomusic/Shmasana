import { connect } from 'react-redux';
import Tasks from './tasks';
import { logout } from '../../actions/session_actions'

const mapStateToProps = ({session}) => (
  {
    currentUser: session.currentUser
  }
)


const mapDispatchToProps = (dispatch) => (
  // fetch user's teams?
  {
    logout: () => dispatch(logout())
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Tasks);
