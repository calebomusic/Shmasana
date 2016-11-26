import React from 'react';
import { hashHistory } from 'react-router';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';



class DetailProject extends React.Component {
  constructor(props) {
    super(props);

    this.state = { open: false }

    this.renderProjectList = this.renderProjectList.bind(this);
    this.toggleProjectList = this.toggleProjectList.bind(this);
    this.handleProjectChange = this.handleProjectChange.bind(this);
    this.redirectOnProjectChange = this.redirectOnProjectChange.bind(this);
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

    if (this.props.task.project && this.props.task.project.name) {
      project = this.props.task.project.name;
    }

    return(
      <DropDownMenu
        value={project}
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
    this.setState({open: !this.state.open})
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

    this.redirectOnProjectChange(projectId);
  }

  redirectOnProjectChange(projectId) {
    const redirectUserId = this.props.task.author_id;
    const redirectWorkspaceId = this.props.task.workspace_id;

    if (projectId) {
      this.toggleProjectList();
      hashHistory.push(`${redirectUserId}/${redirectWorkspaceId}/${projectId}/${this.props.task.id}`)
    } else {
      this.toggleProjectList();
      this.props.removeProject();
      hashHistory.push(`${redirectUserId}/${redirectWorkspaceId}/list/${this.props.task.id}`)
    }
  }

  render() {
    const project = this.props.task.project ? this.props.task.project.name : 'NO PROJECT'

    let projectList;

    if (this.state.open) {
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
}

  const popoverStyle = {
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    hoverColor: '#FFFFFF',
    hoverBackgroundColor: 'blue'
  }

export default DetailProject;
