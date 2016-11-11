import React from 'react';

import { withRouter } from 'react-router';

import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import DropDownMenu from 'material-ui/DropDownMenu';

// Difference
import { fetchTasksByProject } from '../../util/task_api_util';

// Difference
import TaskListItem from '../tasks/task_list_item'

class WorkspaceTaskList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { tasks: [], taskId: '', task: {}}

    this.createTask = this.createTask.bind(this);
    this.renderTasks = this.renderTasks.bind(this);

    // difference
    this.fetchTasksByProject = fetchTasksByProject.bind(this);

    this.updateView = this.updateView.bind(this);
    this.selectTasks = this.selectTasks.bind(this);
    this.renderViewDropdown = this.renderViewDropdown.bind(this);
  }

  componentWillMount() {
    if (this.props.view) {
      this.props.receiveView(this.props.view)
    } else {
      this.props.receiveView('all')
    }

    const projectId = parseInt(this.props.params.projectId);

    let selectedTasks;

    fetchTasksByProject(projectId, (tasks) =>
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

  componentWillReceiveProps(newProps) {
    const projectId = parseInt(this.props.params.projectId);
    let selectedTasks;

    fetchTasksByProject(projectId, (tasks) =>
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

  renderViewDropdown() {
    return(<DropDownMenu value={this.props.view} style={style}
      onChange={this.updateView} autoWidth={false} labelStyle={labelStyle}
      openImmediately={false}>
        <MenuItem value={'all'} primaryText='All Tasks' />
        <MenuItem value={'incomplete'} primaryText='Incomplete' />
        <MenuItem value={'completed'} primaryText='Completed' />
    </DropDownMenu>)
  }

  updateView(e, i, view) {
    let tasks;

    this.props.receiveView(view);

    const userId = parseInt(this.props.params.userId);
    const workspaceId = parseInt(this.props.params.workspaceId);
    const projectId = parseInt(this.props.params.projectId);

    let selectedTasks;

    fetchTasksByProject(projectId, (tasks) =>
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
        selectedTasks.push(task)
      }
    })

    return selectedTasks;
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

export default withRouter(WorkspaceTaskList);

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
