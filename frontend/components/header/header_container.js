import { connect } from 'react-redux';
import Header from './header';
import { logout } from '../../actions/session_actions';
import { createWorkspace, fetchWorkspaces } from '../../actions/workspace_actions';

const mapStateToProps = ({session}) => (
  {
    currentUser: session.currentUser
  }
)


const mapDispatchToProps = (dispatch) => (
  // fetch user's teams?
  {
    logout: () => dispatch(logout()),
    createWorkspace: (workspace) => dispatch(createWorkspace(workspace)),
    fetchWorkspaces: () => dispatch(fetchWorkspaces())
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Header);
