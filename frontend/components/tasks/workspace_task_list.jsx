import React from 'react';

import { withRouter } from 'react-router';
import { fetchTasksByUserAndWorkspace } from '../../util/task_api_util';

import TaskListItem from './task_list_item'

class WorkspaceTaskList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {tasks: [], taskId: undefined}

    this.createTask = this.createTask.bind(this);
    this.componentWillReceiveAndMount = this.componentWillReceiveAndMount.bind(this);
    this.renderTasks = this.renderTasks.bind(this);
  }

  componentWillMount() {
    this.componentWillReceiveAndMount(this.props)
  }

  componentWillReceiveProps(newProps) {
    this.componentWillReceiveAndMount(newProps);
  }

  componentWillReceiveAndMount(props) {
    const userId = parseInt(this.props.params.userId)
    const workspaceId = parseInt(this.props.params.workspaceId)

    if (props.task) {
      this.setState({taskId: props.task.id});
    }

    fetchTasksByUserAndWorkspace(userId, workspaceId, (tasks) =>
      this.setState({tasks: tasks})
    )
  }
  createTask() {
    const userId = parseInt(this.props.params.userId)
    const workspaceId = parseInt(this.props.params.workspaceId)

    this.props.createTask({workspace_id: workspaceId, author_id: userId})
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
