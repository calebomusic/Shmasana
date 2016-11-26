import { connect } from 'react-redux';

import DetailHeader from './detail_header';

import { updateTask,
         deleteTask,
         fetchTask,
         removeTask } from '../../../actions/task_actions';

import { removeProject } from '../../../actions/project_actions';

import { fetchTasksByUserAndWorkspace,
         fetchTasksByProject } from '../../../actions/tasks_actions';

const mapStateToProps = (state) => (
  {
    currentUser: state.session.currentUser,
    workspace: state.workspace[Object.keys(state.workspace)],
    task: state.task,
    loading: state.loading
  }
)


const mapDispatchToProps = (dispatch) => (
  {
    updateTask: (task) => dispatch(updateTask(task)),
    deleteTask: (task) => dispatch(deleteTask(task)),
    fetchTask: (id) => dispatch(fetchTask(id)),
    removeTask: () => dispatch(removeTask()),
    removeProject: () => dispatch(removeProject()),
    fetchTasksByUserAndWorkspace: (userId, workspaceId) => {
    dispatch(fetchTasksByUserAndWorkspace(userId, workspaceId))},
    fetchTasksByProject: (projectId) => {
      dispatch(fetchTasksByProject(projectId))
    }
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps)(DetailHeader);
