import React from 'react';

import AllHeaders from './header/all_headers';
import SideBarContainer from './sidebar/sidebar_container'
import TaskListContainer from './tasks/task_list_container';


const App = ({children, params}) => {
  return(
  <div className='app'>
    <SideBarContainer />
    <div className='main-content'>
      <AllHeaders />
      <div className='tasks'>
        <TaskListContainer />
        {children}
      </div>
    </div>
  </div>)
};

export default App;
