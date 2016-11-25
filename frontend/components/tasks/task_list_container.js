import { connect } from 'react-redux';

import TaskList from './task_list';

import { closeSidebar } from '../../actions/sidebar_actions';
import { createProject,
         receiveProject,
         fetchProject,
         removeProject } from '../../actions/project_actions';
import { createTask,
         updateTask,
         fetchTasksByUserAndWorkspace,
         fetchTask } from '../../actions/task_actions';

import { receiveView } from '../../actions/view_actions'

const mapStateToProps = (state) => (
  {
    currentUser: state.session.currentUser,
    sidebar: state.sidebar,
    task: state.task,
    tasks: state.tasks,
    view: state.view
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    createTask: (task) => dispatch(createTask(task)),
    updateTask: (task) => dispatch(updateTask(task)),
    fetchTask: (id) => dispatch(fetchTask(id)),
    receiveView: (view) => dispatch(receiveView(view))
  }
)

export default connect(
  mapStateToProps, mapDispatchToProps)(TaskList);
