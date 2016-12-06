import React from 'react';
import { withRouter, hashHistory } from 'react-router';

import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import { lightBlue200 } from 'material-ui/styles/colors';

class TaskListItem extends React.Component {
  constructor(props) {
    super(props)

    this.state = { location: '', selected: false, open: false}

    this.handleChange = this.handleChange.bind(this);
    this.updateTask = this.props.updateTask.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
    this.updateFocus = this.updateFocus.bind(this);
    this.updateBlur = this.updateBlur.bind(this);
  }

  componentWillMount() {
    if (this.props.task.title === undefined) {
      this.setState({title: ''});
    } else {
      this.setState({title: this.props.task.title})
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.task.title === undefined) {
      this.setState({title: ''});
    } else {
      this.setState({title: newProps.task.title});
    }
  }

  handleChange(e) {
    this.props.task.title = e.target.value;
    this.setState( {title: e.target.value });
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
    this.props.fetchTask(this.props.task.id);
  }

  updateBlur() {
    this.props.task.title = this.state.title;

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
            <TextField id={'' + this.props.task.id + this.props.task.name}
                       hintText=""
                       value={this.state.title}
                       onChange={this.handleChange}
                       multiLine={false}
                       underlineShow={true}
                       style={textFieldStyle}
                       onFocus={this.updateFocus}
                       onBlur={this.updateBlur}
                       inputStyle ={{width: '100%'}} />
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
    paddingBottom: '3px',
    width: '100%'
  }

export default withRouter(TaskListItem);
