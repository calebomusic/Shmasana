import React from 'react';
import { hashHistory } from 'react-router';

class TaskListItem extends React.Component {
  constructor(props) {
    super(props)

    const title = this.props.task.title ? this.props.task.title : ''

    this.state = { location: '', selected: false,
      title: title}

    this.setLocation = this.setLocation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateTask = this.props.updateTask.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
    this.updateFocus = this.updateFocus.bind(this);
    this.updateBlur = this.updateBlur.bind(this);
  }

  componentWillMount() {
    this.setLocation(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.setLocation(newProps)
    this.setState({title: newProps.task.title})
  }

  setLocation(props) {
    const userId = props.task.author_id;
    const workspaceId = props.task.workspace_id;
    const projectId = props.task.project_id;
    const taskId = props.task.id;

    let location

    if (projectId) {
      location = `${userId}/${workspaceId}/${projectId}/${taskId}`;
    } else {
      location = `${userId}/${workspaceId}/list/${taskId}`;
    }
    this.setState({location: location})
  }

  handleChange(e) {
    this.setState({title: e.target.value})
    this.props.task.title = e.target.value
    this.props.updateTask(this.props.task);
  }

  toggleComplete() {
    this.props.task.completed = !this.props.task.completed
    this.props.updateTask(this.props.task);
  }

  updateFocus() {
    this.setState({selected: true});
    this.props.fetchTask(this.props.task.id)
  }

  updateBlur() {
    this.setState({selected: false});
  }

  render() {
    let className, buttonClassName;
    // debugger
    if (this.props.task.completed) {
      className = 'completed-task-list-item';
      buttonClassName = 'completed-task-list-check';
    } else {
      className = 'task-list-item';
      buttonClassName = 'task-list-check';
    }

    if (this.state.selected && this.state.completed) {
      className = 'selected-' + className;
    }
    // check location to toggle selected?

    return(<li className={className}>
      <button onClick={this.toggleComplete}
        className={buttonClassName}></button>
      <input className='task-list-item-title' value={this.state.title}
        onChange={this.handleChange} onFocus={this.updateFocus}
        onBlur={this.updateBlur} placeholder=''>
      </input>
    </li>)
  }
}

export default TaskListItem;
