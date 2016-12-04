import React from 'react';

import AllHeaders from './header/all_headers';
import SideBarContainer from './sidebar/sidebar_container'
import TaskListContainer from './tasks/task_list_container';
import UserTour from './tour';

const App = ({children, params}) => {
  let tour;

  if (!(params.taskId && params.projectId)) {
    tour = <UserTour />
  }

  return(
  <div className='app'>
    <SideBarContainer />
    {tour}
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
