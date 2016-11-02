import React from 'react';
import { Link } from 'react-router';

import ActionDropdown from './action_dropdown';
import UserDropdown from './user_dropdown';

const Header = (props) => {
  return(<div className='home-header'>
  <div className='home-header-left'>
    <p>
      <Link to='/'>MY TASKS</Link>
    </p>
    <ActionDropdown />
  </div>
    <div className='home-header-right'>
      <UserDropdown user={props.currentUser}
        logout={props.logout} />
    </div>
  </div>)
}

export default Header
