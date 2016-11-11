import React from 'react';
import { withRouter, hashHistory } from 'react-router';

import Trash from 'material-ui/svg-icons/action/delete';
import DateRange from 'material-ui/svg-icons/action/date-range'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import { fetchProject, fetchProjectsByWorkspace } from '../../util/project_api_util';
import {
  lightBlue200, lightBlue500, lightRed200, grey50, grey600, deepPurple50, red500, blue500, redA400, pink400
} from 'material-ui/styles/colors';
import Spinner from '../spinner';

import Divider from 'material-ui/Divider';
import Popover from 'material-ui/Popover';
import Avatar from 'material-ui/Avatar';

import { fetchUser, fetchUsersByWorkspace } from '../../util/user_api_util';

const colors = [red500, blue500, redA400, pink400]
const avatarStyle = {margin: 0};

const titleStyle = {
  fontSize: '24px',
  padding: '20px'
}

class Detail extends React.Component {
  constructor(props) {
    super(props)

    this.state = { project: {}, selected: false,
                   projectListOpen: false, assignees: [],
                   projects: [], task: {},
                   title: '',
                   description: '',
                   dueDate: '', assigneeListOpen: false}

    this.renderHeader = this.renderHeader.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
    this.renderProject = this.renderProject.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateFocus = this.updateFocus.bind(this);
    this.updateBlur = this.updateBlur.bind(this);
    this.renderDescription = this.renderDescription.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.closeDetail = this.closeDetail.bind(this);
    this.fetchProjectsByWorkspace = fetchProjectsByWorkspace.bind(this);
    this.fetchUsersByWorkspace = fetchUsersByWorkspace.bind(this);
    this.renderProjectList = this.renderProjectList.bind(this);
    this.toggleProjectList = this.toggleProjectList.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleProjectChange = this.handleProjectChange.bind(this);
    this.renderAssignee = this.renderAssignee.bind(this);
    this.toggleAssigneeList = this.toggleAssigneeList.bind(this);
    this.renderAssigneeList = this.renderAssigneeList.bind(this);
    this.fetchAssignees = this.fetchAssignees.bind(this);
    this.handleAssigneeChange = this.handleAssigneeChange.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.renderAvatar = this.renderAvatar.bind(this);
  }

  componentWillMount() {
    this.props.fetchTask(this.props.params.taskId)
    this.setState({dueDate: this.props.task.due_date })
  }

  componentWillReceiveProps(newProps){
    // Refractor to avoid seting state.

    // Refractor low-priority
    if (!newProps.task.due_date && !this.state.dueDate) {
      this.setState({dueDate: '' } )
    } else if (newProps.task.due_date && !this.state.dueDate) {
      this.setState({dueDate: newProps.task.dueDate})
    }


    // if (newProps.task.project_id) {
    //   const projectId = parseInt(newProps.task.project_id)
    //   fetchProject( projectId, (project) => (
    //     this.setState({project: project} )),
    //       (error) => console.log(error))
    // }

    // if (newProps.task.author_id) {
    //   const authorId = parseInt(newProps.task.author_id)
    //   fetchUser( authorId, (author) => (
    //     this.setState({author: author} )),
    //       (error) => console.log(error))
    // }

    const title = newProps.task.title ? newProps.task.title : '';
    const description = newProps.task.description ? newProps.task.description : '';
    this.setState({title: title, description: description})
  }

  renderHeader() {
    const dueDate = this.props.task.due_date ? this.parseDate(this.props.task.due_date) : 'Due Date'
    const assignee = this.props.task.assignee ? this.props.task.assignee.username : 'Unassigned'

    return(<div className='task-detail-header'>
      <div className='task-detail-username'>{this.renderAssignee()}</div>
      <div className='task-detail-due-date'>
        <DatePicker hintText={dueDate} value={this.state.dueDate}
          onChange={this.handleDateChange} container="inline"
          inputStyle={{color: lightBlue200, secondaryTextColor: lightBlue200,
          textColor: lightBlue200}} textFieldStyle={{
            color: lightBlue200, textColor: grey600, secondaryTextColor: lightBlue200,
          width: '65px'}}  defaultDate={this.props.task.due_date}>
        </DatePicker>
      </div>
      <div className='task-detail-delete' onTouchTap={this.deleteTask}>
        <Trash color={grey600} hoverColor={grey50}/>
        </div>
      <div className='task-detail-close' onTouchTap={this.closeDetail}>x</div>
    </div>)
  }

  renderAssignee() {
    const assignee = this.props.task.assignee ? this.props.task.assignee.username : 'Unassigned';

    let assingneeList;

    if (this.state.assigneeListOpen) {
      assingneeList = this.renderAssigneeList();
    } else {
      assingneeList = this.renderAvatar();
    }

    return(<div className='task-detail-assignee'>
            {assingneeList}
          </div>)
  }

  renderAvatar() {
    if (this.props.task.assignee) {
      let letter = this.props.task.assignee.username[0]
      let color = colors[letter.charCodeAt() % 4]

      return(
            <Avatar
              color={deepPurple50}
              backgroundColor={color}
              size={40}
              style={avatarStyle}
              onTouchTap={this.toggleAssigneeList}
            >
            {letter}
            </Avatar>
          )
    } else {
      return(<MenuItem value={undefined} primaryText={'Unassigned'}
        onClick={this.toggleAssigneeList} />)
    }
  }

  toggleAssigneeList() {
    this.setState({assigneeListOpen: !this.state.assigneeListOpen})
  }

  // This fetches all possible assignees. Should do this through workspace
  fetchAssignees() {
    const workspaceId = parseInt(this.props.params.workspaceId)

    let projectList;

    if (this.state.assignees.length === 0) {
      this.fetchUsersByWorkspace((workspaceId), (assignees) => {
        this.setState({assignees: assignees})
      }, (e) => console.log(e))
    }

    return this.renderAssigneeList()
  }

  renderAssigneeList() {
    let assignees

    if (this.props.workspace) {
      assignees = this.props.workspace.team.map( (assignee) => (
        <MenuItem value={assignee} primaryText={assignee.username} />
      ))
    }

    // Needs a handle change
    return(<DropDownMenu value={this.state.assignee} style={assigneeStyle}
      onChange={this.handleAssigneeChange('assignee_id')} autoWidth={false}
      openImmediately={true}>
        <MenuItem value={''} primaryText='Unassigned' />
        {assignees}
    </DropDownMenu>)
  }

  deleteTask() {
    this.closeDetail();
    this.props.deleteTask(this.props.task.id);
    this.props.removeTask();
  }

  closeDetail() {
    this.props.removeTask()

    const userId = this.props.task.author_id;
    const workspaceId = this.props.task.workspace_id;
    const projectId = this.props.task.project_id;
    const taskId = this.props.task.id;

    let location;

    if (projectId) {
      location = `${userId}/${workspaceId}/${projectId}`;
    } else {
      location = `${userId}/${workspaceId}/`;
    }

    hashHistory.push(location)
  }

  renderProject() {
    // debugger
    const project = this.props.task.project ? this.props.task.project.name : 'NO PROJECT'

    let projectList;

    if (this.state.projectListOpen) {
      projectList = this.renderProjectList();
    } else {
      projectList = <MenuItem value={undefined} primaryText={project} onClick={this.toggleProjectList} />
    }

    return(<div className='task-detail-project'>
            {projectList}
          </div>)
  }

  // fetchProjectList() {
  //   // debugger
  //   const workspaceId = parseInt(this.props.params.workspaceId)
  //
  //   if (this.state.projects.length === 0) {
  //     this.fetchProjectsByWorkspace((workspaceId), (projects) => {
  //       this.setState({projects: projects})
  //     }, (e) => console.log(e))
  //   }
  //
  //
  //   return this.renderProjectList()
  // }

  renderProjectList() {
    // debugger

    let projects;

    if (this.props.workspace) {
      projects = this.props.workspace.projects.map( (project) => (
        <MenuItem value={project} primaryText={project.name} />
      ))
    }

    let project;

    if (this.props.task.project) {
      project = this.props.task.project.name;
    }
    // <MenuItem value={undefined} primaryText={'No Project'} />

    return(<DropDownMenu value={this.props.task.project.name} style={popoverStyle}
      onChange={this.handleProjectChange} autoWidth={false}
      openImmediately={true}>
        <MenuItem value={undefined} primaryText={'No Project'} />
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
    // this.props.fetchTask(this.props.task.id)
  }

  updateBlur() {
    this.setState({selected: false});
  }

  handleChange(field) {
    return (e) => {
      // debugger
      this.props.task[field] = e.target.value
      // this.setState({[field]: e.target.value, projectList: false})
      this.props.updateTask(this.props.task);
    }
  }

  handleDateChange(e, date) {
    this.props.task.due_date = date;
    // this.setState({dueDate: date})
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

    const redirectUserId = this.props.task.author_id
    const redirectWorkspaceId = this.props.task.workspace_id
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
      // Left over from general handleDropdownChange method
      if (field === 'assignee_id') {
        this.toggleAssigneeList();
      } else {
        this.toggleProjectList();
      }

      let assigneeId

      if (value) {
        assigneeId = value.id
      } else {
        assigneeId = null
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

    return(<div className='task-detail-title-button'>
    <button onClick={this.toggleComplete}
      className={buttonClassname}></button>

      <input className='task-detail-title' value={this.state.title} onChange={this.handleChange('title')}
        onFocus={this.updateFocus} onBlur={this.updateBlur} placeholder='New Task'>
        </input>
    </div>)
  }

  renderDescription() {
    return(<div className='task-detail-description'>
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

  // <textarea className='task-detail-description-text-area' contentEditable="true"
  //   value={this.state.description} onChange={this.handleChange('description')}
  //   onFocus={this.updateFocus} onBlur={this.updateBlur} placeholder='Description'>
  // </textarea>
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

    return(<footer className='task-detail-footer'>
    {created}
    <br />
    {completed}
    </footer>)
  }

  render() {
    if (this.props.loading) {
      return(<div className='task-detail'>
        {this.renderHeader()}
        <div className='detail-spinner'>
          <Spinner />
        </div>
      </div>)
    } else {
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
}

export default withRouter(Detail);

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
