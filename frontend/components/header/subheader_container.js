import { connect } from 'react-redux';
import SubHeader from './subheader';
import { fetchWorkspace } from '../../actions/workspace_actions';
import { fetchProject, removeProject } from '../../actions/project_actions';

const mapStateToProps = (state) => {
  let workspace
  if (Object.keys(state.workspace).length > 0) {
    workspace = state.workspace[Object.keys(state.workspace)[0]]
  }

  return({
    currentUser: state.session.currentUser,
    workspace: workspace,
    project: state.project,
    loading: state.loading
  })
}



const mapDispatchToProps = (dispatch) => (
  {
    fetchWorkspace: (id) => dispatch(fetchWorkspace(id)),
    fetchProject: (id) => dispatch(fetchProject(id)),
    removeProject: () => dispatch(removeProject())
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps)(SubHeader);
