import { connect } from 'react-redux';
import Detail from './detail';
import { updateTask, deleteTask } from '../../actions/task_actions';


const mapStateToProps = (state) => (
  {
    currentUser: state.session.currentUser,
    task: state.task
  }
)


const mapDispatchToProps = (dispatch) => (
  // fetch user's teams?
  {
    updateTask: (task) => dispatch(updateTask(task)),
    deleteTask: (task) => dispatch(deleteTask(task))
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Detail);
