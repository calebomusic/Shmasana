import React from 'react';

import { withRouter } from 'react-router';
import { fetchTasksByUserAndWorkspace } from '../../util/task_api_util';

import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import DropDownMenu from 'material-ui/DropDownMenu';


import TaskListItem from './task_list_item'

class WorkspaceTaskList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {tasks: [], taskId: '', task: {}, view: 'all'}

    this.createTask = this.createTask.bind(this);
    this.componentWillReceiveAndMount = this.componentWillReceiveAndMount.bind(this);
    this.renderTasks = this.renderTasks.bind(this);
    this.updateView = this.updateView.bind(this);
    this.selectTasks = this.selectTasks.bind(this);
    this.renderViewDropdown = this.renderViewDropdown.bind(this);
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
      this.setState({task: props.task})
    }

    this.updateView(undefined, undefined, 'all')
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

  renderViewDropdown() {
    return(<DropDownMenu value={this.state.view} style={style}
      onChange={this.updateView} autoWidth={false}
      openImmediately={false}>
        <MenuItem value={'all'} primaryText='All Tasks' />
        <MenuItem value={'incomplete'} primaryText='Incomplete' />
        <MenuItem value={'completed'} primaryText='Completed' />
    </DropDownMenu>)
  }

  updateView(e, i, view) {
    let tasks;

    const userId = parseInt(this.props.params.userId);
    const workspaceId = parseInt(this.props.params.workspaceId);

    let selectedTasks;

    fetchTasksByUserAndWorkspace(userId, workspaceId, (tasks) =>
      {
        if (view === 'completed') {
          selectedTasks = this.selectTasks(tasks, true);
          this.setState({tasks: selectedTasks, view: view});
        } else if (view === 'incomplete') {
          selectedTasks = this.selectTasks(tasks, false);
          this.setState({tasks: selectedTasks, view: view});
        } else {
          this.setState({tasks: tasks, view: view})
        }
      }
    )
  }

  selectTasks(tasks, completed) {
    let selectedTasks = [];
    debugger
    tasks.forEach((task) => {
      if (completed && task.completed) {
        selectedTasks.push(task);
      } else if (!completed && !task.completed) {
        selectedTasks.push(task)
      }
    })

    return selectedTasks;
  }

  render() {
    return(
    <div className='task-list'>
      <div className='task-list-top'>
        <button className='task-list-top-left' onTouchTap={this.createTask}>Add Task</button>
        {this.renderViewDropdown()}
      </div>
      <div className='task-list-list'>
        {this.renderTasks()}
      </div>
    </div>)
  }
}

export default withRouter(WorkspaceTaskList);

const style = {
  width: '200px',
  display: 'flex',
  flexDirection: 'column',
  fontSize: '12px',
  textAlign: 'center'
}
