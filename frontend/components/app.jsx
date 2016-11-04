import React from 'react';

import AllHeaders from './header/all_headers';
import SideBarContainer from './sidebar/sidebar_container'
import TasksContainer from './tasks/tasks_container'


const App = ({ children }) => (
  <div className='app'>
    <SideBarContainer />
    <div className='main-content'>
      <AllHeaders />
      <TasksContainer />
    </div>
      {children}
  </div>
);

export default App;
