import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import React from 'react';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import { Link, hashHistory } from 'react-router';

import { fetchUserWorkspaces } from '../../util/workspace_api_util'

import CreateWorkspaceModal  from './create_workspace_modal';

const buttonStyle = {
  backgroundColor: '#fc7279'
};

const popoverStyle = {
  display: 'flex',
  flexDirection: 'column',
  hoverColor: '#FFFFFF',
  hoverBackgroundColor: 'blue'
}

const menuStyle = {
  hoverColor: '#FFFFFF',
  hoverBackgroundColor: 'blue'
}

class UserDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false, modal: false, workspaces: []
    };

    this.handleTouchTap = this.handleTouchTap.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
    this.logoutRedirect = this.logoutRedirect.bind(this);
    this.createWorkspace = this.createWorkspace.bind(this);
    this.openModalAndClose = this.openModalAndClose.bind(this);
    this.renderTeams = this.renderTeams.bind(this);
    this.fetchUserWorkspaces = fetchUserWorkspaces.bind(this);
    this.closeAndFetchWorkspace = this.closeAndFetchWorkspace.bind(this);
  }
  componentWillMount() {
    const userId = this.props.user.id
    this.fetchUserWorkspaces(userId, (workspaces) => {
      this.setState({workspaces: workspaces});
    });
  }
  handleTouchTap(e) {
    e.preventDefault();
    this.setState({
      open: true,
      modal: false,
      anchorEl: e.currentTarget
    });
  };

  handleRequestClose() {
    this.setState({
      open: false,
    });
  };

  logoutRedirect() {
    this.props.logout();
    hashHistory.push('/login');
  }

  createWorkspace() {
    this.props.createWorkspace({workspace: { name: '' }})
  }

  openModalAndClose() {
    this.setState({['modal']: true})
    this.handleRequestClose();
  }

  renderTeams() {
    return(this.state.workspaces.map( (workspace) => {
      let closeAndFetchWorkspace = this.closeAndFetchWorkspace.bind(this, workspace.id);
      return(<MenuItem primaryText={workspace.name} key={workspace.id}
        onTouchTap={closeAndFetchWorkspace}>
      </MenuItem>)
      }
    ))
  }

  closeAndFetchWorkspace(id) {
    this.props.fetchWorkspace(id);
    this.handleRequestClose();
  }

  render() {
    if (this.state.modal) {
      return(
        <div className='create-workspace-modal'>
          <div className='header-user-dropdown' onTouchTap={this.handleTouchTap}>
            <p>{this.props.user.username}</p>
          <FloatingActionButton mini={true} style={buttonStyle} >
          </FloatingActionButton>
        </div>
          <div className='create-workspace-modal'>
            <CreateWorkspaceModal
            createWorkspace={this.props.createWorkspace} />
          </div>
        </div>)
    } else {
      return(<div>
        <div className='header-user-dropdown' onTouchTap={this.handleTouchTap}>
          <p>{this.props.user.username}</p>
        <FloatingActionButton mini={true} style={buttonStyle} >
        </FloatingActionButton>
        </div>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
          style={popoverStyle}
        >
          <Menu style={menuStyle} >
            {this.renderTeams()}
            <Divider />
            <MenuItem primaryText="Create Workspace" onTouchTap={this.openModalAndClose}/>
            <Divider />
            <MenuItem primaryText='Settings' />
            <Divider />
            <MenuItem primaryText="Logout" onClick={this.logoutRedirect}/>
          </Menu>
        </Popover>
      </div>)
    }
  }
}

export default UserDropdown;
