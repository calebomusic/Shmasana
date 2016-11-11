import { connect } from 'react-redux';
import Detail from './detail';
import { updateTask, deleteTask, fetchTask, removeTask } from '../../actions/task_actions';
import { removeProject } from '../../actions/project_actions';

const mapStateToProps = (state) => (
  {
    currentUser: state.session.currentUser,
    workspace: state.workspace[Object.keys(state.workspace)],
    task: state.task,
    loading: state.loading
  }
)


const mapDispatchToProps = (dispatch) => (
  // fetch user's teams?
  {
    updateTask: (task) => dispatch(updateTask(task)),
    deleteTask: (task) => dispatch(deleteTask(task)),
    fetchTask: (id) => dispatch(fetchTask(id)),
    removeTask: () => dispatch(removeTask()),
    removeProject: () => dispatch(removeProject())
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Detail);
