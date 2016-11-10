import React from 'react';
import { withRouter, Link, hashHistory } from 'react-router';
import DrawerIcon from 'material-ui/svg-icons/action/reorder';
import FlatButton from 'material-ui/FlatButton';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';

import {
  red500, blue500, redA400, pink400, deepPurple50
} from 'material-ui/styles/colors';

import CreateProjectModal from './create_project_modal';

import { fetchProjectsByWorkspace, fetchProject } from '../../util/project_api_util';

const style = {
  width: '400px',
  height: '40px',
  verticalAlign: 'center',
  borderRight: '1px solid',
  borderColor: '#EFF0F1',
}

const avatarStyle = {margin: 0};
const colors = [red500, blue500, redA400, pink400]

class SideBar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {projects: [], projectId: this.props.project.id, open: true};

    this.handleToggle = this.handleToggle.bind(this);
    this.renderOpenSidebar = this.renderOpenSidebar.bind(this);
    this.renderTeamates = this.renderTeamates.bind(this);
    this.renderProjectList = this.renderProjectList.bind(this);
    this.updateProject = this.updateProject.bind(this);
    this.fetchProject = fetchProject.bind(this);
    this.renderAvatars = this.renderAvatars.bind(this)
  }

  componentWillMount() {
    // const workspaceId = parseInt(this.props.router.params.workspaceId)
    //
    // fetchProjectsByWorkspace(workspaceId, (projects) => {
    //   this.setState({projects: projects});
    // });
  }

  // Don't forget to fetch new projects on prop change.
  componentWillReceiveProps(newProps) {
    // const workspaceId = parseInt(this.props.router.params.workspaceId)
    // fetchProjectsByWorkspace(workspaceId, (projects) => {
    //   this.setState({projects: projects});
    // });
  }

  handleToggle() {
    this.setState({open: !this.state.open})
  }

  renderOpenSidebar() {
    return(
      <div className='sidebar'>
        <div className='logo-exit'>
          <span className='sidebar-logo'>shmasana</span>
          <span className='sidebar-exit' onTouchTap={this.props.closeSidebar}>x</span>
        </div>
          {this.renderTeamates()}
          {this.renderProjects()}
      </div>
    )
  }
  renderAvatars() {
    return this.props.workspace.team.map( (user, i) => {
      let letter = user[0][0];
      let color = colors[letter.charCodeAt() % 4]

      return(
            <Avatar
              color={deepPurple50}
              backgroundColor={color}
              size={30}
              style={avatarStyle}
            >
            {letter}
            </Avatar>
          )
    });
  }

  renderTeamates() {
    // return 'invite people' w/ up to 3 pictures and the + sign. Else return + sign with 6 pictures
    return(<div className='sidebar-teammates'>
      <div className='teammates-left'>
        {this.renderAvatars()}
      </div>
      <div className='teammates-right'>
          <p>Invite People</p>
        <button className='larger-sidebar-button'>+</button>
      </div>
    </div>)
  }

  renderProjects() {
    return(<div className='sidebar-projects'>
    <div className='projects-title-and-button'>
      <p className='project-list-title'>PROJECTS</p>
      <CreateProjectModal createProject={this.props.createProject}/>
    </div>
      <ul className='project-list'>
        {this.renderProjectList()}
      </ul>
    </div>)
  }

  updateProject(newProject) {
    // debugger

    // This flashes the workspace and project name a few times
    this.props.fetchProject(newProject.id)

    // This doesn't allow one to select other projects in the sidebar and update accordingly
      // this.fetchProject(newProject.id, (project) => {
    //   const currentUserId = this.props.currentUser.id;
    //   const workspaceId = project.workspace_id;
    //
    //   hashHistory.push(`${currentUserId}/${workspaceId}/${project.id}`)
    // })
  }

  renderProjectList() {
    const userId = this.props.router.params.userId
    const workspaceId = this.props.router.params.workspaceId
    const url = `/${userId}/${workspaceId}/`

    return this.props.workspace.projects.map( (project) => {
      let projectURL = `${url}${project.id}`;
      const updateProject = this.updateProject.bind(this, project)
      let className = 'project-list-item';
      let liClassName = 'project-list-li'

      if (this.props.project && this.props.project.id === project.id ) {
        className = 'project-list-item-selected';
        liClassName = 'project-list-li-selected'
      }

      return(<li onTouchTap={updateProject} key={project.id} className={liClassName}>
              <p className={className}>{project.name}</p>
            </li>)
    });
  }

  render() {
    if (this.props.sidebar && this.props.workspace) {
      return this.renderOpenSidebar();
    } else {
      return(<div></div>)
    }
  }
}

export default withRouter(SideBar);
