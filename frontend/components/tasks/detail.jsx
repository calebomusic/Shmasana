import React from 'react';
import { withRouter, hashHistory } from 'react-router';
import Trash from 'material-ui/svg-icons/action/delete';
import DateRange from 'material-ui/svg-icons/action/date-range'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { fetchUser } from '../../util/user_api_util';
import DatePicker from 'material-ui/DatePicker';
import { fetchProject, fetchProjectsByWorkspace } from '../../util/project_api_util';
import { lightBlue200, lightBlue500, lightRed200 } from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import Popover from 'material-ui/Popover';



class Detail extends React.Component {
  constructor(props) {
    super(props)

    this.state = { assignee: {}, project: {}, selected: false,
                   projectListOpen: false,
                   projects: [], author: {}, task: {}, project_id: undefined,
                   title: '',
                   description: '',
                   dueDate: '', openAssigneeList: false}

    this.renderHeader = this.renderHeader.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
    this.renderProject = this.renderProject.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateFocus = this.updateFocus.bind(this);
    this.updateBlur = this.updateBlur.bind(this);
    this.renderDescription = this.renderDescription.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.closeDetail = this.closeDetail.bind(this);
    this.fetchProjectsByWorkspace = fetchProjectsByWorkspace.bind(this)
    this.renderProjectList = this.renderProjectList.bind(this);
    this.openProjectList = this.openProjectList.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.fetchProjectList = this.fetchProjectList.bind(this);
    this.handleProjectChange = this.handleProjectChange.bind(this);
  }

  componentWillMount() {
    this.props.fetchTask(this.props.params.taskId)
    this.setState({dueDate: this.props.task.due_date })
  }

  componentWillReceiveProps(newProps){
    if (newProps.task.assignee_id) {
      const assigneeId = parseInt(newProps.task.assignee_id)
      fetchUser( assigneeId, (assignee) => (
        this.setState({assignee: assignee} ),
          (error) => console.log(error) )
      )
    } else {
      this.setState({assignee: {}} )
    }

    console.log(newProps.task.due_date);
    console.log(this.state.dueDate);

    if (!newProps.task.due_date && !this.state.dueDate) {
      this.setState({dueDate: '' } )
    } else if (newProps.task.due_date && !this.state.dueDate) {
      this.setState({dueDate: newProps.task.dueDate})
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
    const dueDate = this.props.task.due_date ? this.parseDate(this.props.task.due_date) : 'Due Date'
    const assignee = this.state.assignee.username ? this.state.assignee.username : 'Unassigned'

    return(<div className='task-detail-header'>
      <div className='task-detail-username'>{assignee}</div>
      <div className='task-detail-due-date'>
        <DateRange />
        <DatePicker hintText={dueDate} value={this.state.dueDate} onChange={this.handleDateChange}
          inputStyle={{color: lightBlue200, secondaryTextColor: lightBlue200,
          textColor: lightBlue200}} textFieldStyle={{
            color: lightBlue200, textColor: lightBlue200, secondaryTextColor: lightBlue200,
          width: '65px'}}>
        </DatePicker>
      </div>
      <div className='task-detail-options'><Trash /></div>
      <div className='task-detail-close' onTouchTap={this.closeDetail}>x</div>
    </div>)
  }

  renderAssignee() {
    const assignee = this.state.assignee.name ? this.state.assignee.name : 'Unassigned';

    let assingneeList;

    if (this.state.assigneeListOpen) {
      assingneeList = this.fetchAssignees()
    } else {
      assingneeList = <MenuItem value={undefined} primaryText={assignee} onClick={this.toggleAssigneeList} />
    }

    return(<div className='task-detail-assignee'>
            {assingneeList}
          </div>)
  }

  toggleAssigneeList() {
    this.setState({openAssigneeList: !this.state.openAssingneeList})
  }
  fetchAssignees() {

  }

  renderAssigneeList() {

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
    const project = this.state.project.name ? this.state.project.name : 'NO PROJECT'

    let projectList;

    if (this.state.projectListOpen) {
      projectList = this.fetchProjectList()
    } else {
      projectList = <MenuItem value={undefined} primaryText={project} onClick={this.openProjectList} />
    }

    return(<div className='task-detail-project'>
            {projectList}
          </div>)
  }

  fetchProjectList() {
    // debugger
    const workspaceId = parseInt(this.props.params.workspaceId)
    const project = this.state.project.name ? this.state.project.name : 'NO PROJECT'

    let projectList;

    if (this.state.projects.length === 0) {
      this.fetchProjectsByWorkspace((workspaceId), (projects) => {
        this.setState({projects: projects})
      }, (e) => console.log(e))
    }


    return this.renderProjectList()
  }

  renderProjectList() {
    // debugger
    const projects = this.state.projects.map( (project) => (
      <MenuItem value={project} primaryText={project.name} />
    ))

    return(<DropDownMenu value={this.state.project_id} style={popoverStyle}
      onChange={this.handleProjectChange} autoWidth={false}>
        <MenuItem value={undefined} primaryText={'No Project'} />
        {projects}
    </DropDownMenu>)
  }

  openProjectList() {
    this.setState({projectListOpen: true})
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
      debugger
      this.props.task[field] = e.target.value
      this.setState({[field]: e.target.value, projectList: false})
      this.props.updateTask(this.props.task);
    }
  }

  handleDateChange(e, date) {
    this.props.task.due_date = date;
    // this.setState({dueDate: date})
    this.props.updateTask(this.props.task);
  }

  handleProjectChange(e, i, project) {
    debugger
    this.props.task.project_id = project.id;
    this.props.updateTask(this.props.task)
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
    const date = this.parseDate(this.props.task.created_at)

    return(<footer className='task-detail-footer'>
    {this.state.author.username} created task. {date}
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
