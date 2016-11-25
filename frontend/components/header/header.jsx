import React from 'react';
import { Link, withRouter, hashHistory } from 'react-router';

import ActionDropdown from './action_dropdown';
import UserDropdown from './user_dropdown';
import FlatButton from 'material-ui/FlatButton';

import DrawerIcon from 'material-ui/svg-icons/action/reorder';

const style = {
  height: '40px',
  verticalAlign: 'center',
  borderRight: '1px solid',
  borderColor: '#EFF0F1',
  display: 'flex',
  justifyContent: 'center'
}


const Header = (props) => {
  let sidebarButton;

  if (!props.sidebar) {
    sidebarButton = <span className='sidebar-button' onTouchTap={props.openSidebar}>
      <FlatButton style={style} ><DrawerIcon /></FlatButton>
    </span>
  }

  const redirectToWorkspace = () => {
    const workspaceId = props.router.params.workspaceId;
    const userId = props.router.params.userId;

    hashHistory.push(`${userId}/${workspaceId}`);
    props.fetchWorkspaceAndTasks(props.router.params.workspaceId);
    props.removeProject();
  }

  const currentUserId = props.currentUser.id

  return(<div className='home-header'>
  <div className='home-header-left'>
    {sidebarButton}
    <p>
      <button onClick={redirectToWorkspace}>My Tasks</button>
    </p>
    <ActionDropdown createTask={props.createTask}
      createProject={props.createProject} project={props.project} />
  </div>
    <div className='home-header-right'>
      <UserDropdown currentUser={props.currentUser}
        logout={props.logout} fetchWorkspaces={props.fetchWorkspaces}
        createWorkspace={props.createWorkspace} fetchWorkspace={props.fetchWorkspace}
        />
    </div>
  </div>)
}

export default withRouter(Header);
