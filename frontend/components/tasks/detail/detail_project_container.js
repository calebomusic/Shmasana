import { connect } from 'react-redux';

import DetailProject from './detail_project';

import { updateTask,
         updateTaskAndFetch,
         deleteTask,
         fetchTask,
         removeTask } from '../../../actions/task_actions';

import { removeProject } from '../../../actions/project_actions';

import { fetchTasksByUserAndWorkspace,
         fetchTasksByProject } from '../../../actions/tasks_actions';

const mapStateToProps = (state) => (
  {
    workspace: state.workspace[Object.keys(state.workspace)],
    task: state.task.present,
  }
)


const mapDispatchToProps = (dispatch) => (
  {
    updateTaskAndFetch: (task) => dispatch(updateTaskAndFetch(task)),
    fetchTask: (id) => dispatch(fetchTask(id)),
    removeTask: () => dispatch(removeTask()),
    removeProject: () => dispatch(removeProject()),
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps)(DetailProject);
