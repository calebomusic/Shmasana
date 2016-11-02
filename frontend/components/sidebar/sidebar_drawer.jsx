import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import Menu from 'material-ui/Menu';
import DrawerIcon from 'material-ui/svg-icons/action/reorder'

const style = {
  height: '40px'
}

export default class DrawerSimpleExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};

    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle() {
    this.setState({open: !this.state.open})
  }

  render() {
    return (
      <div className='sidebar'>
        <FlatButton
          label={<DrawerIcon />}
          onTouchTap={this.handleToggle}
          style={style}
        />
        <Drawer open={this.state.open}>
          <Menu>
            <MenuItem>Logo</MenuItem>
            <MenuItem onTouchTap={this.handleToggle}>X</MenuItem>
            <Divider />
            <MenuItem>People</MenuItem>
            <MenuItem>Projects</MenuItem>
          </Menu>
        </Drawer>
      </div>
    );
  }
}

// May want logo + exit to be an app bar
