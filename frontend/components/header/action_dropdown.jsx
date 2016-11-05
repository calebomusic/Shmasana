import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import React from 'react';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider'

const style = {
  backgroundColor: '#fc7279'
};

class ActionDropdown extends React.Component {

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
        <button className='action-dropdown-button'>+</button>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
          >
          <Menu>
            <MenuItem primaryText="Task" />
            <Divider />
            <MenuItem primaryText="Conversation" />
            <Divider />
            <MenuItem primaryText="Project" />
            <Divider />
            <MenuItem primaryText="Invite" />
          </Menu>
        </Popover>
      </div>
    );
  }
}

// <FloatingActionButton mini={true} onTouchTap={this.handleTouchTap}>
//    <ContentAdd />
// </FloatingActionButton>

export default ActionDropdown;
