import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import React from 'react';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import { withRouter } from 'react-router';

import CreateProjectModal from './action_dropdown_create_project';


const style = {
  backgroundColor: 'white'
};

const popoverStyle = {
  display: 'flex',
  flexDirection: 'column'
}

class ActionDropdown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false, modal: false
    };

    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.createTask = this.createTask.bind(this);
    this.openModalAndClose = this.openModalAndClose.bind(this);
  }

  handleTouchTap(e) {
    e.preventDefault();

    this.setState({
      open: true,
      anchorEl: e.currentTarget,
    });
  };

  componentWillReceiveProps(newProps) {
    this.setState({modal: false})
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  };

  createTask() {
    const userId = parseInt(this.props.params.userId);
    const workspaceId = parseInt(this.props.params.workspaceId);

    const task = { workspace_id: workspaceId, author_id: userId }

    const projectId = this.props.params.projectId;

    if (projectId) {
      task.project_id = parseInt(projectId)
    }

    console.log(userId);
    console.log(workspaceId);
    console.log(projectId);
    console.log(task);

    this.props.createTask(task)
  }

  openModalAndClose() {
    this.setState({modal: true})
    this.handleRequestClose();
  }


  render() {
    if (this.state.modal) {
      return(<CreateProjectModal createProject={this.props.createProject} />)
    } else {
      return (
        <div>
          <button className='action-dropdown-button' onTouchTap={this.handleTouchTap}>+</button>
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.handleRequestClose}
            style={popoverStyle}
            >
            <Menu style={style} >
              <MenuItem primaryText="Add Task" onClick={this.createTask} />
              <Divider />
              <MenuItem primaryText="Project" onTouchTap={this.openModalAndClose}/>
            </Menu>
          </Popover>
        </div>
      )
    };
  }
}

export default withRouter(ActionDropdown);
