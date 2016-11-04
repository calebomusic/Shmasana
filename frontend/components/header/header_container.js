import { connect } from 'react-redux';
import Header from './header';
import { logout } from '../../actions/session_actions';
import { createWorkspace, fetchWorkspaces, fetchWorkspace } from '../../actions/workspace_actions';

const mapStateToProps = ({session}) => {
  return({
    currentUser: session.currentUser
  })
}


const mapDispatchToProps = (dispatch) => (
  // fetch user's teams?
  {
    logout: () => dispatch(logout()),
    createWorkspace: (workspace) => dispatch(createWorkspace(workspace)),
    fetchWorkspace: (id) => dispatch(fetchWorkspace(id)),
    fetchWorkspaces: () => dispatch(fetchWorkspaces())
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Header);
