import React from 'react';
import { Link } from 'react-router';

import { ActionDropdown } from './action_dropdown';

const Header = () => {
  return(<div className='home-header'>
  <div className='home-header-left'>
    <Link to='/'>My Tasks</Link>
    <ActionDropdown />
  </div>
  <div className='home-header-right'></div>
  </div>)
}

export default Header
