import { connect } from 'react-redux';

import DetailContent from './detail_content';

import { updateTaskAndFetch,
         deleteTask,
         fetchTask,
         removeTask } from '../../../actions/task_actions';

import { removeProject } from '../../../actions/project_actions';

import { fetchTasksByUserAndWorkspace,
         fetchTasksByProject } from '../../../actions/tasks_actions';

const mapStateToProps = (state) => (
  {
    task: state.task.present,
    title: state.task.present.title
  }
)


const mapDispatchToProps = (dispatch) => (
  {
    updateTaskAndFetch: (task) => dispatch(updateTaskAndFetch(task)),
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps)(DetailContent);
