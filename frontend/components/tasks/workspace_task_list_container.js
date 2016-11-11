import { connect } from 'react-redux';
import { closeSidebar } from '../../actions/sidebar_actions';
import { createProject,
  receiveProject,
  fetchProject,
  removeProject } from '../../actions/project_actions';
import { createTask,
         updateTask,
         fetchTasksByUserAndWorkspace,
         fetchTask } from '../../actions/task_actions';

import WorkspaceTaskList from './workspace_task_list'
import { receiveView } from '../../actions/view_actions'

const mapStateToProps = (state) => {
  return({
    currentUser: state.session.currentUser,
    sidebar: state.sidebar,
    task: state.task,
    tasks: state.tasks,
    view: state.view,
    loading: state.loading
  })
}

const mapDispatchToProps = (dispatch) => {
  return({
    createTask: (task) => dispatch(createTask(task)),
    updateTask: (task) => dispatch(updateTask(task)),
    fetchTasksByUserAndWorkspace: (userId, workspaceId) => {
      dispatch(fetchTasksByUserAndWorkspace(userId, workspaceId)) },
    fetchTask: (id) => dispatch(fetchTask(id)),
    receiveView: (view) => dispatch(receiveView(view))
  })
}

export default connect(
  mapStateToProps, mapDispatchToProps)(WorkspaceTaskList);
