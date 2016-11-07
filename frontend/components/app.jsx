import React from 'react';

import AllHeaders from './header/all_headers';
import SideBarContainer from './sidebar/sidebar_container'
import WorkspaceTaskListContainer from './tasks/workspace_task_list_container'

const App = ({children, params}) => {
  let TaskList;

  if (!parseInt(params.projectId)) {
    TaskList = <div className='tasks'>
    <WorkspaceTaskListContainer />
    {children}
    </div>
  } else {
    TaskList = {children}
  }

  return(
  <div className='app'>
    <SideBarContainer />
    <div className='main-content'>
      <AllHeaders />
      {TaskList}
    </div>
  </div>)
};

export default App;
