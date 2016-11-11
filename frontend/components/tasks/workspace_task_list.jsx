import React from 'react';
import { withRouter } from 'react-router';

import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import DropDownMenu from 'material-ui/DropDownMenu';

import TaskListItem from './task_list_item';

import { fetchTasksByUserAndWorkspace, updateTask } from '../../util/task_api_util';

class WorkspaceTaskList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { tasks: [], task: {}, view: 'all'}

    this.createTask = this.createTask.bind(this);
    this.renderTasks = this.renderTasks.bind(this);
    this.updateView = this.updateView.bind(this);
    this.selectTasks = this.selectTasks.bind(this);
    this.renderViewDropdown = this.renderViewDropdown.bind(this);
  }

  componentWillMount() {
    if (this.props.view) {
      this.props.receiveView(this.props.view);
    } else {
      this.props.receiveView('all');
    }

    const userId = parseInt(this.props.params.userId);
    const workspaceId = parseInt(this.props.params.workspaceId);

    let selectedTasks;

    fetchTasksByUserAndWorkspace(userId, workspaceId, (tasks) =>
      {
        if (this.props.view === 'completed') {
          selectedTasks = this.selectTasks(tasks, true);
          this.setState({tasks: selectedTasks});
        } else if (this.props.view === 'incomplete') {
          selectedTasks = this.selectTasks(tasks, false);
          this.setState({tasks: selectedTasks});
        } else {
          this.setState({tasks: selectedTasks});
        }
      }
    )
  }

  componentWillReceiveProps(newProps) {
    const userId = parseInt(this.props.params.userId);
    const workspaceId = parseInt(this.props.params.workspaceId);

    let selectedTasks;

    fetchTasksByUserAndWorkspace(userId, workspaceId, (tasks) =>
      {
        if (this.props.view === 'completed') {
          selectedTasks = this.selectTasks(tasks, true);
          this.setState({tasks: selectedTasks});
        } else if (this.props.view === 'incomplete') {
          selectedTasks = this.selectTasks(tasks, false);
          this.setState({tasks: selectedTasks});
        } else {
          this.setState({tasks: tasks})
        }
      }
    )
  }

  createTask() {
    const userId = parseInt(this.props.params.userId)
    const workspaceId = parseInt(this.props.params.workspaceId)

    this.props.createTask({workspace_id: workspaceId, author_id: userId})
  }

  renderTasks() {
    if (this.state.tasks) {
      return this.state.tasks.map( (task) => (
        <TaskListItem task={task}
          updateTask={this.props.updateTask}
          fetchTask={this.props.fetchTask}
          key={task.id + task.title}/>
      ))
    }
  }

  renderViewDropdown() {
    return(
      <DropDownMenu value={this.state.view}
                    style={style}
                    labelStyle={labelStyle}
                    onChange={this.updateView}
                    autoWidth={false}
                    openImmediately={false}>
        <MenuItem value={'all'}
                  primaryText='All Tasks' />
        <MenuItem value={'incomplete'}
                  primaryText='Incomplete' />
        <MenuItem value={'completed'}
                  primaryText='Completed' />
      </DropDownMenu>)
  }

  updateView(e, i, view) {
    let tasks;

    this.props.receiveView(view);

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

    tasks.forEach((task) => {
      if (completed && task.completed) {
        selectedTasks.push(task);
      } else if (!completed && !task.completed) {
        selectedTasks.push(task);
      }
    })

    return selectedTasks;
  }

  render() {
    return(
    <div className='task-list'>
      <div className='task-list-top'>
        <button className='task-list-top-left'
                onTouchTap={this.createTask}>
                  Add Task
        </button>
        <button className='task-list-top-right'>
          {this.renderViewDropdown()}
        </button>
      </div>
      <div className='task-list-list'>
        {this.renderTasks()}
      </div>
    </div>)
  }
}

  const style = {
    width: '200px',
    display: 'flex',
    flexDirection: 'column',
    fontSize: '100px'
  }

  const labelStyle = {
    fontSize: '16px',
    marginLeft: '32.5px'
  }

export default withRouter(WorkspaceTaskList);
