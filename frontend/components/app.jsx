import React from 'react';

import AllHeaders from './header/all_headers';
import SideBarContainer from './sidebar/sidebar_container'
import WorkspaceTaskListContainer from './tasks/workspace_task_list_container'
import ProjectsTaskListContainer from './project/projects_task_list_container';
import TaskListContainer from './tasks/task_list_container';


const App = ({children, params}) => {
  let TaskList;

  // if (!parseInt(params.projectId)) {
  //   TaskList = <div className='tasks'>
  //               <WorkspaceTaskListContainer />
  //               {children}
  //              </div>
  // } else {
  //   TaskList = <div className='tasks'>
  //               <ProjectsTaskListContainer />
  //               {children}
  //              </div>
  // }

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
