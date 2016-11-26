import { connect } from 'react-redux';

import Detail from './detail';

import { fetchTask } from '../../../actions/task_actions';
import { removeProject } from '../../../actions/project_actions';

const mapStateToProps = (state) => (
  {
    task: state.task,
    loading: state.loading
  }
)


const mapDispatchToProps = (dispatch) => (
  {
    fetchTask: (id) => dispatch(fetchTask(id)),
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Detail);
