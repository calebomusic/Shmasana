import React from 'react';
import { hashHistory } from 'react-router';

import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import {
  lightBlue200,
  lightBlue500,
  lightRed200,
  grey50,
  grey600,
  deepPurple50,
  red500,
  blue500,
  redA400,
  pink400
} from 'material-ui/styles/colors';

class TaskListItem extends React.Component {
  constructor(props) {
    super(props)

    const title = this.props.task.title ? this.props.task.title : ''

    this.state = { location: '', selected: false, title: title, open: false}

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
    this.props.task.title = e.target.value
    this.props.updateTask(this.props.task);
  }

  toggleComplete() {
    this.props.task.completed = !this.props.task.completed
    if (this.props.task.completed) {
      this.setState({open: true})
      this.props.task.completed_at = new Date();
    } else {
      this.setState({open: false})
      this.props.task.completed_at = null;
    }
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

    const message = `Task completed!`;

    return(<li className={className}>
      <button onClick={this.toggleComplete}
              className={buttonClassName}></button>
            <TextField key={this.props.task.id}
                   hintText=""
                   value={this.state.title}
                   onChange={this.handleChange}
                   multiLine={false}
                   underlineShow={true}
                   fullWidth={true}
                   style={textFieldStyle} />
      <Snackbar open={this.state.open}
                message={message}
                autoHideDuration={3000}
                onRequestClose={this.handleRequestClose}
                bodyStyle={snackbarStyle} />
    </li>)
  }
}

  const snackbarStyle = {
    backgroundColor: lightBlue200,
    color: lightBlue200
  }

  const textFieldStyle = {
    paddingLeft: '10px',
    fontSize: '14px',
    height: '30px',
    paddingBottom: '3px'
  }

export default TaskListItem;
