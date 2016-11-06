import React from 'react';
import { withRouter, Link, hashHistory } from 'react-router';
import DrawerIcon from 'material-ui/svg-icons/action/reorder';
import FlatButton from 'material-ui/FlatButton';

import CreateProjectModal from './create_project_modal';

import { fetchProjectsByWorkspace, fetchProject } from '../../util/project_api_util';


const style = {
  width: '400px',
  height: '40px',
  verticalAlign: 'center',
  borderRight: '1px solid',
  borderColor: '#EFF0F1',
}

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
  }

  componentWillMount() {
    const workspaceId = parseInt(this.props.router.params.workspaceId)

    fetchProjectsByWorkspace(workspaceId, (projects) => {
      this.setState({projects: projects});
    });
  }

  // Don't forget to fetch new projects on prop change.
  componentWillReceiveProps(newProps) {
    this.setState({projectId: newProps.project.id })

    const workspaceId = parseInt(this.props.router.params.workspaceId)
    fetchProjectsByWorkspace(workspaceId, (projects) => {
      this.setState({projects: projects});
    });
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

  renderTeamates() {
    // return 'invite people' w/ up to 3 pictures and the + sign. Else return + sign with 6 pictures
    return(<div className='sidebar-teammates'>
      <div className='teammates-left'>
        x
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
    // debugger
    return this.state.projects.map( (project) => {
      let projectURL = `${url}${project.id}`;
      const updateProject = this.updateProject.bind(this, project)
      let className = 'project-list-item';
      let liClassName = 'project-list-li'
      if (this.state.projectId && this.state.projectId === project.id ) {
        className = 'project-list-item-selected';
        liClassName = 'project-list-li-selected'
      }

      return(<li onTouchTap={updateProject} key={project.id} className={liClassName}>
              <p className={className}>{project.name}</p>
            </li>)
    });
  }

  render() {
    if (this.props.sidebar) {
      return this.renderOpenSidebar();
    } else {
      return(<div></div>)
    }
  }
}

export default withRouter(SideBar);
