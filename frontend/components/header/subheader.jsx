import React from 'react';
import { withRouter } from 'react-router';
import { fetchWorkspace } from '../../util/workspace_api_util'

class SubHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {workspaceName: '', projectName: ''}

    this.fetchWorkspace = fetchWorkspace.bind(this);
    this.subheaderChange = this.subheaderChange.bind(this);
    this.fetchProject = this.props.fetchProject.bind(this);
    this.removeProject = this.removeProject.bind(this);
  }

  componentWillMount() {
    this.subheaderChange(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.subheaderChange(newProps);
  }

  subheaderChange(props) {
    let projectId = props.params.projectId
    // debugger
    if (projectId) {
      if (props.project.name) {
        this.setState({projectName: props.project.name});
      } else {
        projectId = parseInt(projectId);
        this.fetchProject(projectId, (project) => {
          this.setState({projectName: project.name})
        });
      }
    } else if(props.workspace) {
      this.setState({workspaceName: props.workspace.name,
                    projectName: undefined});
      this.removeProject()
    } else {
      const workspaceId = parseInt(props.params.workspaceId);
      this.fetchWorkspace(workspaceId, props.currentUser, (workspace) => {
        this.setState({workspaceName: workspace.name,
                        projectName: null});
      this.removeProject()
    });
  }}

  removeProject() {
    if(this.props.project.name) {
      this.props.removeProject();
    }
  }

  render() {
    let subheader;

    if (this.state.projectName) {
      subheader = this.state.projectName;
    } else {
      subheader = this.state.workspaceName
    }
    return(
      <div className='subheader'>
        My tasks in {subheader}
      </div>)
  }
}

export default withRouter(SubHeader);
