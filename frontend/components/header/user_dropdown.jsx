import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import React from 'react';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

const style = {
  backgroundColor: '#fc7279'
};

class UserDropdown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };

    this.handleTouchTap = this.handleTouchTap.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
  }

  handleTouchTap(e) {
    e.preventDefault();
    this.setState({
      open: true,
      anchorEl: e.currentTarget,
    });
  };

  handleRequestClose() {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <div>
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
            <MenuItem primaryText='Settings' />
            <Divider />
            <MenuItem primaryText="Logout" onClick={this.props.logout}/>
          </Menu>
        </Popover>
      </div>
    );
  }
}

export default UserDropdown;
