import React from 'react';
import { withRouter } from 'react-router';
import DrawerIcon from 'material-ui/svg-icons/action/reorder';
import FlatButton from 'material-ui/FlatButton';

import CreateProjectModal from './create_project_modal';

import { fetchProjectsByWorkspace } from '../../util/project_api_util';


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
    this.state = {projects: [], open: true};
    this.handleToggle = this.handleToggle.bind(this);
    this.renderOpenSidebar = this.renderOpenSidebar.bind(this);
    this.renderTeamates = this.renderTeamates.bind(this);
    this.renderProjectList = this.renderProjectList.bind(this);
  }

  componentWillMount() {
    const workspaceId = parseInt(this.props.router.params.workspaceId)
    fetchProjectsByWorkspace(workspaceId, (workspaces) => {
      this.setState({workspaces: workspaces});
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
      <p>PROJECTS</p>
      <CreateProjectModal createProject={this.props.createProject}/>
    </div>
      <ul>
        {this.renderProjectList}
      </ul>
    </div>)
  }

  renderProjectList() {
    const userId = this.props.router.userId
    const workspaceId = this.props.router.workspaceId
    const url = `/${userId}/workspaceId/`
    const projects = thist.state.projects.map( (project) => {
      let projectURL = `${url}${project.id}`
      return(<li><Link to={projectURL}>{project.name}</Link></li>)
    })
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
