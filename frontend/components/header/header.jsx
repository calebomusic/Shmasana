import React from 'react';
import { Link } from 'react-router';

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

  // const myTasks = `/${props.currentUser.id}/${props.workspace.id}`;
  const currentUserId = props.currentUser.id

  return(<div className='home-header'>
  <div className='home-header-left'>
    {sidebarButton}
    <p>
      <Link to=''>My Tasks</Link>
    </p>
    <ActionDropdown createTask={props.createTask} />
  </div>
    <div className='home-header-right'>
      <UserDropdown user={props.currentUser}
        logout={props.logout} fetchWorkspaces={props.fetchWorkspaces}
        createWorkspace={props.createWorkspace} fetchWorkspace={props.fetchWorkspace}
        />
    </div>
  </div>)
}

export default Header;
