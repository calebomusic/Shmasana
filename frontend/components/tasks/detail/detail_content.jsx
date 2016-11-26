import React from 'react';

import TextField from 'material-ui/TextField';

class DetailContent extends React.Component {
  constructor(props) {
    super(props);

    this.toggleComplete = this.toggleComplete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderDescription = this.renderDescription.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
  }
  componentWillMount() {
    const title = this.props.task.title ? this.props.task.title : '';
    this.setState({title: title});
  }

  componentWillReceiveProps(newProps){
    const title = newProps.task.title ? newProps.task.title : '';
    this.setState({title: title});
  }

  handleChange(field) {
    return (e) => {
      this.props.task[field] = e.target.value
      this.props.updateTask(this.props.task);
    }
  }

  toggleComplete() {
    this.props.task.completed = !this.props.task.completed

    if (this.props.task.completed) {
      this.props.task.completed_at = new Date();
    } else {
      this.props.task.completed_at = null;
    }
    this.props.updateTask(this.props.task);
    this.props.updateTask(this.props.task);
  }

  renderDescription() {
    return(
      <div className='task-detail-description'>
        <TextField
          hintText="Description"
          value={this.state.description}
          onChange={this.handleChange('description')}
          multiLine={true} underlineShow={false}
          rows={4}
          rowsMax={10}
          fullWidth = {true} />
      </div>)
  }

  renderTitle() {
    let buttonClassname = 'task-list-check-title';

    if (this.props.task && this.props.task.completed) {
      buttonClassname = 'completed-task-list-check-title'
    }

    return(
      <div className='task-detail-title-button'>
        <button onClick={this.toggleComplete}
                className={buttonClassname}></button>
        <input className='task-detail-title'
               value={this.state.title}
               onChange={this.handleChange('title')}
               placeholder='New Task'>
        </input>
      </div>)
  }

  render() {
    return(
      <div className='task-detail-content'>
        {this.renderTitle()}
        {this.renderDescription()}
      </div>
    )
  }

}

export default DetailContent;
