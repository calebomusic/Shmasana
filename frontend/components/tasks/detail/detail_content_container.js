import { connect } from 'react-redux';

import DetailContent from './detail_content';

import { updateTask,
         deleteTask,
         fetchTask,
         removeTask } from '../../../actions/task_actions';

import { removeProject } from '../../../actions/project_actions';

import { fetchTasksByUserAndWorkspace,
         fetchTasksByProject } from '../../../actions/tasks_actions';

const mapStateToProps = (state) => (
  {
    task: state.task,
  }
)


const mapDispatchToProps = (dispatch) => (
  {
    updateTask: (task) => dispatch(updateTask(task)),
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps)(DetailContent);
