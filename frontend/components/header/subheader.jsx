import React from 'react';
import { withRouter } from 'react-router';
import { fetchWorkspace } from '../../util/workspace_api_util'

class SubHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {workspace: {}, projectName: ''}

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
    } else if (!this.state.workspace.name ||
      props.workspace && parseInt(props.workspace.id) !== this.state.workspace.id) {
      const workspaceId = parseInt(props.params.workspaceId);
      this.fetchWorkspace(workspaceId, props.currentUser, (workspace) => {
        this.setState({workspace: workspace,
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
      subheader = this.state.workspace.name
    }
    return(
      <div className='subheader'>
        My tasks in {subheader}
      </div>)
  }
}

export default withRouter(SubHeader);
