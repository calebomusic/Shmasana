import React from 'react';

import { withRouter } from 'react-router';

// Difference
import { fetchTasksByProject } from '../../util/task_api_util';

// Difference
import TaskListItem from '../tasks/task_list_item'

class WorkspaceTaskList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {tasks: [], taskId: '', task: {}}

    this.createTask = this.createTask.bind(this);
    this.componentWillReceiveAndMount = this.componentWillReceiveAndMount.bind(this);
    this.renderTasks = this.renderTasks.bind(this);

    // difference
    this.fetchTasksByProject = fetchTasksByProject.bind(this)
  }

  componentWillMount() {
    this.componentWillReceiveAndMount(this.props)
  }

  componentWillReceiveProps(newProps) {
    this.componentWillReceiveAndMount(newProps);
  }

  componentWillReceiveAndMount(props) {
    // debugger
    const userId = parseInt(this.props.params.userId)
    const workspaceId = parseInt(this.props.params.workspaceId)

    // Difference
    const projectId = parseInt(this.props.params.projectId);

    if (props.task) {
      this.setState({taskId: props.task.id});
      this.setState({task: props.task})
    }

    // Difference
    fetchTasksByProject(projectId, (tasks) => {
      this.setState({tasks: tasks})
    }
    )
  }

  createTask() {
    const userId = parseInt(this.props.params.userId)
    const workspaceId = parseInt(this.props.params.workspaceId)

    // Difference
    const projectId = parseInt(this.props.params.projectId)

    this.props.createTask({workspace_id: workspaceId, author_id: userId, project_id: projectId})
  }

  renderTasks() {
    return this.state.tasks.map( (task) => (
      <TaskListItem task={task}
        updateTask={this.props.updateTask}
        fetchTask={this.props.fetchTask}
        key={task.id}/>
    ))
  }

  render() {
    return(
    <div className='task-list'>
      <div className='task-list-top'>
        <button className='task-list-top-left' onTouchTap={this.createTask}>Add Task</button>
        <button className='task-list-top-right'>Adjust View here</button>
      </div>
      <div className='task-list-list'>
        {this.renderTasks()}
      </div>
    </div>)
  }
}

export default withRouter(WorkspaceTaskList);
