import React from 'react';

import HeaderContainer from './header/header_container'
import SideBarContainer from './sidebar/sidebar_drawer_container'
import TasksContainer from './tasks/tasks_container'


const App = ({ children }) => (
  <div>
    <div className='sidebar-header'>
      <SideBarContainer />
      <HeaderContainer  />
    </div>
    <TasksContainer />
      {children}
  </div>
);

export default App;


// <SideBarContainer />
// <TasksContainer />
