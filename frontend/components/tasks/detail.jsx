import React from 'react';
import { withRouter, hashHistory } from 'react-router';

import Trash from 'material-ui/svg-icons/action/delete';
import DateRange from 'material-ui/svg-icons/action/date-range'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
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
import Divider from 'material-ui/Divider';
import Popover from 'material-ui/Popover';
import Avatar from 'material-ui/Avatar';

import Spinner from '../spinner';
import CommentFormContainer from './comments/comment_form_container';
import CommentListContainer from './comments/comment_list_container';

import DetailHeaderContainer from './detail_header_container';

class Detail extends React.Component {
  constructor(props) {
    super(props)

    this.state = { project: {}, selected: false,
                   projectListOpen: false, assignees: [],
                   projects: [], task: {},
                   title: '',
                   description: '',
                   dueDate: '', assigneeListOpen: false}

    this.toggleComplete = this.toggleComplete.bind(this);
    this.renderProject = this.renderProject.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateFocus = this.updateFocus.bind(this);
    this.updateBlur = this.updateBlur.bind(this);
    this.renderDescription = this.renderDescription.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.renderProjectList = this.renderProjectList.bind(this);
    this.toggleProjectList = this.toggleProjectList.bind(this);
    this.handleProjectChange = this.handleProjectChange.bind(this);
  }

  componentWillMount() {
    this.props.fetchTask(this.props.params.taskId)
    this.setState({dueDate: this.props.task.due_date })
  }

  componentWillReceiveProps(newProps){
    if (!newProps.task.due_date && !this.state.dueDate) {
      this.setState({dueDate: '' } )
    } else if (newProps.task.due_date && !this.state.dueDate) {
      this.setState({dueDate: newProps.task.dueDate})
    }

    const title = newProps.task.title ? newProps.task.title : '';
    const description = newProps.task.description ? newProps.task.description : '';
    this.setState({title: title, description: description})
  }

  renderProject() {
    const project = this.props.task.project ? this.props.task.project.name : 'NO PROJECT'

    let projectList;

    if (this.state.projectListOpen) {
      projectList = this.renderProjectList();
    } else {
      projectList = <MenuItem value={undefined}
                              primaryText={project}
                              onClick={this.toggleProjectList} />
    }

    return(
      <div className='task-detail-project'>
        {projectList}
      </div>)
  }

  renderProjectList() {
    let projects;

    if (this.props.workspace) {
      projects = this.props.workspace.projects.map( (project) => (
        <MenuItem value={project}
                  primaryText={project.name} />
      ))
    }

    let project;

    // Gtet an Uncaugt TypeError "cannot read property name of null" here when switching project to no project.
    if (this.props.task.project) {
      project = this.props.task.project.name;
    }

    return(
      <DropDownMenu
        value={this.props.task.project.name}
        style={popoverStyle}
        onChange={this.handleProjectChange}
        autoWidth={false}
        openImmediately={true}>
          <MenuItem value={undefined}
                    primaryText={'No Project'} />
          {projects}
      </DropDownMenu>)
  }

  toggleProjectList() {
    this.setState({projectListOpen: !this.state.projectListOpen})
  }

  parseDate(date) {
    date = new Date(date).toDateString().split(' ');
    const month = date[1];
    const day = parseInt(date[2]);

    return month + ' ' + day
  }

  updateFocus() {
    this.setState({selected: true});
  }

  updateBlur() {
    this.setState({selected: false});
  }

  handleChange(field) {
    return (e) => {
      this.props.task[field] = e.target.value
      this.props.updateTask(this.props.task);
    }
  }

  handleDateChange(e, date) {
    this.props.task.due_date = date;
    this.props.updateTask(this.props.task);
  }

  handleProjectChange(e, i, project) {
    let projectId;

    if (project) {
      projectId = project.id;
    } else {
      projectId = null;
    }

    this.props.task.project_id = projectId;
    this.props.updateTask(this.props.task);

    const redirectUserId = this.props.task.author_id;
    const redirectWorkspaceId = this.props.task.workspace_id;

    if (project) {
      this.toggleProjectList();
      hashHistory.push(`${redirectUserId}/${redirectWorkspaceId}/${projectId}/${this.props.task.id}`)
    } else {
      this.toggleProjectList();
      this.props.removeProject();
      hashHistory.push(`${redirectUserId}/${redirectWorkspaceId}/list/${this.props.task.id}`)
    }
  }

  handleAssigneeChange(field) {
    return (e, i, value) => {
      if (field === 'assignee_id') {
        this.toggleAssigneeList();
      } else {
        this.toggleProjectList();
      }

      let assigneeId;

      if (value) {
        assigneeId = value.id;
      } else {
        assigneeId = null;
      }

      this.props.task[field] = assigneeId;
      this.props.updateTask(this.props.task);
    }
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
               onFocus={this.updateFocus}
               onBlur={this.updateBlur}
               placeholder='New Task'>
        </input>
      </div>)
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

  renderFooter(){
    const date = this.parseDate(this.props.task.created_at);
    let created, completed;

    if (this.props.task.author) {
      created = `${this.props.task.author.username} created task. ${date}`;
    }

    let completor = this.props.task.assignee ? this.props.task.assignee.username
                                             : this.props.task.author
                                              ? this.props.task.author.username
                                              : '';

    if (this.props.task.completed) {
      const completedAt = this.parseDate(this.props.task.completed_at);
      completed = `${completor} ` + 'completed this task. ' + `${completedAt}`;
    }

    return(
      <footer className='task-detail-footer'>
        {created}
        <br />
        {completed}
      </footer>)
  }

  render() {
    if (this.props.loading) {
      return(<div className='task-detail'>

        <div className='detail-spinner'>
          <Spinner />
        </div>
      </div>)
    } else {
      return(
        <div className='task-detail'>
          <DetailHeaderContainer />
          <div className='task-detail-body'>
            {this.renderProject()}
            <div className='task-detail-content'>
              {this.renderTitle()}
              {this.renderDescription()}
            </div>
          </div>
          {this.renderFooter()}
          <CommentListContainer />
          <CommentFormContainer />
        </div>
      )
    }
  }
}

  const style = {
    color: '#76e0f1',
    backgroundColor: '76e0f1'
  }


  const popoverStyle = {
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    hoverColor: '#FFFFFF',
    hoverBackgroundColor: 'blue'
  }

  const assigneeStyle = {
    width: '150px',
    display: 'flex',
    flexDirection: 'column'
  }

  const colors = [red500, blue500, redA400, pink400]
  const avatarStyle = {margin: 0};

  const titleStyle = {
    fontSize: '24px',
    padding: '20px'
  }

export default withRouter(Detail);
