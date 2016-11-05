import React from 'react';
import { withRouter } from 'react-router';
import { fetchWorkspace } from '../../util/workspace_api_util'

class SubHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {workspaceName: ''}
    this.fetchWorkspace = fetchWorkspace.bind(this)
    this.subheaderChange = this.subheaderChange.bind(this)
  }

  componentWillMount() {
    this.subheaderChange(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.subheaderChange(newProps);
  }

  subheaderChange(props) {
    if(props.workspace) {
      this.setState({workspaceName: props.workspace.name})
    } else {
      const workspaceId = parseInt(props.params.workspaceId);
      this.fetchWorkspace(workspaceId, props.currentUser, (workspace) => {
        this.setState({workspaceName: workspace.name});
    });
  }}

  render() {
    return(
      <div className='subheader'>
        My tasks in {this.state.workspaceName}
      </div>)
  }
}

export default withRouter(SubHeader);
