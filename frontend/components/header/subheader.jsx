import React from 'react';
import { withRouter } from 'react-router';
import { fetchWorkspace } from '../../util/workspace_api_util'

import Spinner from '../spinner';

class SubHeader extends React.Component {
  constructor(props) {
    super(props)

    this.removeProject = this.removeProject.bind(this);
  }

  removeProject() {
    if(this.props.project.name) {
      this.props.removeProject();
    }
  }

  setSubheader(params) {
    if (params.projectId && this.props.project.name !== undefined) {
      return 'My tasks in ' + this.props.project.name
    } else if (this.props.workspace && this.props.workspace.name !== undefined) {
      return 'My tasks in ' + this.props.workspace.name
    } else {
      return '';
    }
  }

  render() {
    let subheader;

    return(
      <div className='subheader'>
        {this.setSubheader(this.props.params)}
      </div>)
  }
}


export default withRouter(SubHeader);
