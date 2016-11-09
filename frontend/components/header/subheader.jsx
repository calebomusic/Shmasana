import React from 'react';
import { withRouter } from 'react-router';
import { fetchWorkspace } from '../../util/workspace_api_util'

class SubHeader extends React.Component {
  constructor(props) {
    super(props)
    // debugger
    //
    // let projectId = this.props.params.projectId
    // if (projectId) {
    //   if (this.props.project.name) {
    //     this.state = { subheader: this.props.project.name}
    //     // console.log(`logged ${this.state.projectName}`);
    //   } else {
    //     projectId = parseInt(projectId);
    //     this.props.fetchProject(projectId);
    //     this.state = { subheader: '...'};
    //   }
    // } else {
    //   if (this.props.workspace) {
    //     this.state = { subheader: this.props.workspace.name }
    //   } else {
    //     const workspaceId = parseInt(this.props.params.workspaceId);
    //     this.props.fetchWorkspace(workspaceId)
    //     this.removeProject()
    //     this.state = { subheader: '...'};
    //   }
    // }

    this.subheaderChange = this.subheaderChange.bind(this);
    this.removeProject = this.removeProject.bind(this);
    // this.removeProject()
  }

  componentWillMount() {
    // // debugger
    // // this.subheaderChange(this.props);
    // const projectId = parseInt(this.props.params.projectId);
    //
    // if (projectId) {
    //   this.props.fetchProject(projectId);
    // } else {
    //   const workspaceId = parseInt(this.props.params.workspaceId);
    //   this.props.fetchWorkspace(workspaceId)
    // }
  }

  componentWillReceiveProps(newProps) {
    // debugger
    // const projectId = parseInt(newProps.params.projectId);
    //
    // if (projectId) {
    //   this.props.fetchProject(projectId);
    // } else {
    //   const workspaceId = parseInt(newProps.params.workspaceId);
    //   this.props.fetchWorkspace(workspaceId)
    // }
  }

  subheaderChange(newProps) {
    // let projectId = props.params.projectId


    // console.log(`projId: ${projectId}`);
    // console.log(`workspace: ${props.workspace}`);
    // let projectId = newProps.params.projectId
    // if (projectId) {
    //   if (newProps.project.name) {
    //     // this.setState({ subheader: newProps.project.name});
    //     // console.log(`logged ${this.state.projectName}`);
    //   } else {
    //     projectId = parseInt(projectId);
    //     this.fetchProject(projectId);
    //     // this.setState subheader: '...'};
    //   }
    // } else {
    //   if (newProps.workspace) {
    //     // this.setState = { subheader: newProps.workspace.name }
    //   } else {
    //     const workspaceId = parseInt(newProps.params.workspaceId);
    //     newProps.fetchWorkspace(workspaceId)
    //     this.removeProject()
    //     // this.setState = { subheader: '...'};
    //   }

    // if (projectId) {
    //   if (props.project.name) {
    //     this.setState({projectName: props.project.name});
    //     // console.log(`logged ${this.state.projectName}`);
    //   } else {
    //     projectId = parseInt(projectId);
    //     this.fetchProject(projectId);
    //       // console.log(`logged ${this.state.projectName} FROM THE INSIDE`);
    //     // console.log(`logged ${this.state.projectName} FROM THE OUTSIDE`);
    //   }
    // } else if(props.workspace) {
    //   this.setState({workspace: props.workspace,
    //                 projectName: undefined});
    //   this.removeProject()
    // } else if (!props.workspace || !this.state.workspace.name ||
    //   props.workspace && parseInt(props.workspace.id) !== this.state.workspace.id) {
    //   const workspaceId = parseInt(props.params.workspaceId);
    //   this.fetchWorkspace(workspaceId, props.currentUser, (workspace) => {
    //     this.setState({workspace: workspace,
    //                     projectName: null});
    //   this.removeProject()
    // });
    // console.log(`FROM ALL THE WAY OUT: ${this.state.projectName}`);
  }

  removeProject() {
    if(this.props.project.name) {
      this.props.removeProject();
    }
  }

  setSubheader(params) {
    if (params.projectId) {
      return 'My tasks in ' + this.props.project.name
    } else if (this.props.workspace) {
      return 'My tasks in ' + this.props.workspace.name
    } else {
      return '';
    }
  }

  render() {
    let subheader;

    // if (this.state.projectName) {
    //   subheader = this.state.projectName;
    // } else {
    //   subheader = this.state.workspace.name
    // }
    // console.log("HEADER: " + subheader)
    return(
      <div className='subheader'>
       {this.setSubheader(this.props.params)}
      </div>)
  }
}

export default withRouter(SubHeader);
