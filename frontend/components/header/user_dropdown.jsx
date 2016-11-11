import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import React from 'react';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import { Link, hashHistory } from 'react-router';
import {
  red500, blue500, redA400, pink400, deepPurple50
} from 'material-ui/styles/colors';

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

const avatarStyle = {
  marginTop: '4px'
}

const colors = [red500, blue500, redA400, pink400];

class UserDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false, modal: true, workspaces: []
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
    const userId = this.props.currentUser.id
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
    this.setState({modal: true})
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
    let letter = this.props.currentUser.username[0];
    let color = colors[letter.charCodeAt() % 4];

    if (this.state.modal) {
      return(
        <div>
          <div className='header-user-dropdown' onTouchTap={this.handleTouchTap}>
            <p>{this.props.currentUser.username}</p>
          <Avatar
            color={deepPurple50}
            backgroundColor={color}
            size={30}
            style={avatarStyle}
          >
          {letter}
          </Avatar>
        </div>
          <div className='create-workspace-modal'>
            <CreateWorkspaceModal
            createWorkspace={this.props.createWorkspace} />
          </div>
        </div>)
    } else {
      return(<div>
        <div className='header-user-dropdown' onTouchTap={this.handleTouchTap}>
          <p>{this.props.currentUser.username}</p>
        <Avatar
          color={deepPurple50}
          backgroundColor={color}
          size={30}
          style={avatarStyle}
        >
        {letter}
        </Avatar>
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
            <MenuItem primaryText="Logout" onClick={this.logoutRedirect}/>
          </Menu>
        </Popover>
      </div>)
    }
  }
}

export default UserDropdown;
