import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import React from 'react';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import { hashHistory } from 'react-router';

import CreateWorkspaceModal  from './create_workspace_modal';

const style = {
  backgroundColor: '#fc7279'
};

class UserDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false, modal: false
    };

    this.handleTouchTap = this.handleTouchTap.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
    this.logoutRedirect = this.logoutRedirect.bind(this);
    this.createWorkspace = this.createWorkspace.bind(this);
    this.openModalAndClose = this.openModalAndClose.bind(this);
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
  render() {
    console.log(this.state.modal);
    if (this.state.modal) {
      return(
        <div>
          <div className='header-user-dropdown' onTouchTap={this.handleTouchTap}>
            <p>{this.props.user.username}</p>
          <FloatingActionButton mini={true} style={style} >
          </FloatingActionButton>
        </div>
          <CreateWorkspaceModal
          createWorkspace={this.props.createWorkspace} />
        </div>)
    } else {
      return(<div>
        <div className='header-user-dropdown' onTouchTap={this.handleTouchTap}>
          <p>{this.props.user.username}</p>
        <FloatingActionButton mini={true} style={style} >
        </FloatingActionButton>
        </div>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            <MenuItem primaryText="Teams" />
            <MenuItem primaryText="..." />
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
