import { connect } from 'react-redux';
import SubHeader from './subheader';
import { fetchWorkspace } from '../../actions/workspace_actions';

const mapStateToProps = ({ session }, ownProps) => (
  {
    currentUser: session.currentUser
  }
)



const mapDispatchToProps = (dispatch) => (
  // Needs some way to toggle task or calendar display.
  {
    fetchWorkspace: (id) => dispatch(fetchWorkspace(id))
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps)(SubHeader);
