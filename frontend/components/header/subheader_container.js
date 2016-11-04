import { connect } from 'react-redux';
import SubHeader from './subheader';
import { fetchWorkspace } from '../../actions/workspace_actions';

const mapStateToProps = (state, ownProps) => {
  debugger
  let workspace
  if (Object.keys(state.workspace).length > 0) {
    workspace = state.workspace[Object.keys(state.workspace)[0]]
  }

  return({
    currentUser: state.session.currentUser,
    workspace: workspace
  })
}



const mapDispatchToProps = (dispatch) => (
  // Needs some way to toggle task or calendar display.
  {
    fetchWorkspace: (id) => dispatch(fetchWorkspace(id))
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps)(SubHeader);
