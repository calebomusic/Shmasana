import React from 'react';
import { withRouter, Link, hashHistory } from 'react-router';

import DrawerIcon from 'material-ui/svg-icons/action/reorder';
import FlatButton from 'material-ui/FlatButton';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import {
  red500,
  blue500,
  redA400,
  pink400,
  deepPurple50 } from 'material-ui/styles/colors';

import InviteModal from './invite_modal';
import CreateProjectModal from './create_project_modal';

import { fetchProjectsByWorkspace, fetchProject } from '../../util/project_api_util';

class SideBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {projects: [], projectId: this.props.project.id, open: true};

    this.handleToggle = this.handleToggle.bind(this);
    this.renderOpenSidebar = this.renderOpenSidebar.bind(this);
    this.renderTeamates = this.renderTeamates.bind(this);
    this.renderProjectList = this.renderProjectList.bind(this);
    this.renderAvatars = this.renderAvatars.bind(this);
  }

  handleToggle() {
    this.setState({open: !this.state.open})
  }

  renderOpenSidebar() {
    return(
      <div className='sidebar'>
        <div className='logo-exit'>
          <span className='sidebar-logo'>shmasana</span>
          <span className='sidebar-exit'
                onTouchTap={this.props.closeSidebar}>
            x
          </span>
        </div>
          {this.renderTeamates()}
          {this.renderProjects()}
      </div>
    )
  }

  renderAvatars() {
    return this.props.workspace.team.map( (user, i) => {
      let letter = user.username[0];
      let color = colors[letter.charCodeAt() % 4]

      return(
          <div key={user.username + user.id}>
            <Avatar
              color={deepPurple50}
              backgroundColor={color}
              size={30}
              style={avatarStyle}
              id={user.username + user.id}>
              {letter}
            </Avatar>
          </div>
          )
    });
  }

  renderTeamates() {
    return(
      <div className='sidebar-teammates'>
        <div className='teammates-left'>
          {this.renderAvatars()}
        </div>
          <InviteModal updateWorkspace={this.props.updateWorkspace}
                       workspace={this.props.workspace}
                       fetchWorkspace={this.props.fetchWorkspace} />
      </div>)
  }

  renderProjects() {
    return(
      <div className='sidebar-projects'>
        <div className='projects-title-and-button'>
          <p className='project-list-title'>PROJECTS</p>
          <CreateProjectModal createProject={this.props.createProject} />
        </div>
          <ul className='project-list'>
            {this.renderProjectList()}
          </ul>
      </div>)
  }

  renderProjectList() {
    const userId = this.props.router.params.userId;
    const workspaceId = this.props.router.params.workspaceId;
    const url = `/${userId}/${workspaceId}/`;

    return this.props.workspace.projects.map( (project) => {
      let projectURL = `${url}${project.id}`;
      const fetchProject = this.props.fetchProject.bind(this, project.id)
      let className = 'project-list-item';
      let liClassName = 'project-list-li';

      if (this.props.project && this.props.project.id === project.id ) {
        className = 'project-list-item-selected';
        liClassName = 'project-list-li-selected';
      }

      return(
        <li onTouchTap={fetchProject}
             key={project.id + project.name}
             className={liClassName}>
          <p className={className}>
            {project.name}
          </p>
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

  const style = {
    width: '400px',
    height: '40px',
    verticalAlign: 'center',
    borderRight: '1px solid',
    borderColor: '#EFF0F1',
  }

  const labelStyle = {
    fontSize: '16px',
    marginLeft: '32.5px'
  }

  const avatarStyle = {margin: 0};

  const colors = [red500, blue500, redA400, pink400]

export default withRouter(SideBar);
