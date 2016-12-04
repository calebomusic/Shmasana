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
    let title = this.props.task.title;
    title = title ? title : '';

    let description = this.props.task.description;
    description = description ? description : '';

    this.setState({ title, description });
  }

  componentWillReceiveProps(newProps){
    let title = this.props.task.title;
    title = title ? title : '';

    let description = this.props.task.description;
    description = description ? description : '';

    this.setState({ title, description});
  }

  handleChange(field) {
    return (e) => {
      this.props.task[field] = e.target.value;
      this.setState({ [field]: e.target.value });
      this.props.updateTaskAndFetch(this.props.task);
    }
  }

  toggleComplete() {
    this.props.task.completed = !this.props.task.completed

    if (this.props.task.completed) {
      this.props.task.completed_at = new Date();
    } else {
      this.props.task.completed_at = null;
    }
    this.props.updateTaskAndFetch(this.props.task);
  }

  renderDescription() {
    return(
      <div className='task-detail-description'>
        <TextField hintText="Description"
                   value={this.state.description}
                   onChange={this.handleChange('description')}
                   multiLine={true}
                   underlineShow={true}
                   rows={2}
                   rowsMax={3}
                   fullWidth={true}
                   style={textFieldStyle}/>
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

  const textFieldStyle = {
    width: '100%'
  }

export default DetailContent;
