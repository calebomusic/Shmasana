import React from 'react';
import { withRouter } from 'react-router';
import { fetchWorkspace } from '../../util/workspace_api_util'

class SubHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {workspaceName: ''}
    this.fetchWorkspace = fetchWorkspace.bind(this)

    // fetchWorkspace(this.props.currentUser, workspace_id, (workspace) => {
    //   workspaceName = workspace.name;
    // });
  }

  componentWillMount() {
    debugger
    if(this.props.workspace) {
      this.setState({workspaceName: this.props.workspace.name})
    } else {
      const workspace_id = parseInt(this.props.params.workspaceId);
      this.fetchWorkspace(workspace_id, this.props.currentUser, (workspace) => {
        this.setState({workspaceName: workspace.name});
      });
    }
  }
  render() {
    return(
      <div className='subheader'>
        My tasks in {this.state.workspaceName}
      </div>)
  }
}

export default withRouter(SubHeader);
