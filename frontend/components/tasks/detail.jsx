import React from 'react';
import { withRouter } from 'react-router';

import { fetchUser } from '../../util/user_api_util';
import { fetchProject } from '../../util/project_api_util';

class Detail extends React.Component {
  constructor(props) {
    super(props)

    this.state = { assignee: {}, project: {}, selected: false,
                   author: {}, task: {},
                   title: '',
                   description: ''}

    this.renderHeader = this.renderHeader.bind(this);
    this.renderProject = this.renderProject.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateFocus = this.updateFocus.bind(this);
    this.updateBlur = this.updateBlur.bind(this);
    this.renderDescription = this.renderDescription.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.closeDetail = this.closeDetail.bind(this);
  }

  componentWillMount() {
    this.props.fetchTask(this.props.params.taskId)
  }

  componentWillReceiveProps(newProps){
    if (newProps.task.assignee_id) {
      const assigneeId = parseInt(newProps.task.assignee_id)
      fetchUser( assigneeId, (assignee) => (
        this.setState({assignee: assignee} ),
          (error) => console.log(error) )
      )
    }

    if (newProps.task.project_id) {
      const projectId = parseInt(newProps.task.project_id)
      fetchProject( projectId, (project) => (
        this.setState({project: project} )),
          (error) => console.log(error))
    }

    if (newProps.task.author_id) {
      const authorId = parseInt(newProps.task.author_id)
      fetchUser( authorId, (author) => (
        this.setState({author: author} )),
          (error) => console.log(error))
    }

    const title = newProps.task.title ? newProps.task.title : '';
    const description = newProps.task.description ? newProps.task.description : '';
    this.setState({title: title, description: description})
  }

  renderHeader() {
    const dueDate = this.props.task.due_date ? this.props.task.due_date : 'Due Date'
    const assignee = this.state.assignee.username ? this.state.assignee.username : 'Unassigned'
    return(<div className='task-detail-header'>
      <div className='task-detail-username'>{assignee}</div>
      <div className='task-detail-due-date'>{dueDate}</div>
      <div className='task-detail-options'>TRASHCAN</div>
      <div className='task-detail-close' onTouchTap={this.closeDetail}>x</div>
    </div>)
  }

  closeDetail() {
    this.props.removeTask()
    hashHistory.push()

    const userId = props.task.author_id;
    const workspaceId = props.task.workspace_id;
    const projectId = props.task.project_id;
    const taskId = props.task.id;

    let location;

    if (projectId) {
      location = `${userId}/${workspaceId}/${projectId}`;
    } else {
      location = `${userId}/${workspaceId}/`;
    }

    hashHistory.push(location)
  }

  renderProject() {
    const project = this.state.project.name ? this.state.project.name : 'NO PROJECT'

    // Let's render a dropdown of different projects here.
    return(<div className='task-detail-project'>
          {project}
          </div>)
  }

  updateFocus() {
    this.setState({selected: true});
    // this.props.fetchTask(this.props.task.id)
  }

  updateBlur() {
    this.setState({selected: false});
  }

  handleChange(field) {
    return (e) => {
      this.props.task[field] = e.target.value
      this.setState({[field]: e.target.value})
      this.props.updateTask(this.props.task);
    }
  }

  renderTitle() {
    return(<div className='task-detail-title-button'>
    <button onClick={this.toggleComplete}
      className='task-list-check-title'></button>
    <input className='task-detail-title' value={this.state.title} onChange={this.handleChange('title')}
        onFocus={this.updateFocus} onBlur={this.updateBlur} placeholder='New Task'>
      </input>
    </div>)
  }

  renderDescription() {
    return(<div className='task-detail-description'>
    <input value={this.state.description} onChange={this.handleChange('description')}
      onFocus={this.updateFocus} onBlur={this.updateBlur} placeholder='Description'>
    </input>
    </div>)
  }

  toggleComplete() {
    this.props.task.completed = !this.props.task.completed
    this.props.updateTask(this.props.task);
  }

  renderFooter(){
    const milliseconds = Date.parse(this.props.task.created_at);
    const date = new Date(milliseconds).toDateString().split(' ');
    const month = date[1];
    const day = parseInt(date[2]);

    return(<footer className='task-detail-footer'>
    {this.state.author.username} created task. {month} {day}
    </footer>)
  }

  render() {
    return(
      <div className='task-detail'>
        {this.renderHeader()}
        <div className='task-detail-body'>
          {this.renderProject()}
          <div className='task-detail-content'>
            {this.renderTitle()}
            {this.renderDescription()}
          </div>
        </div>
        {this.renderFooter()}
      </div>
    )
  }
}

export default withRouter(Detail);
