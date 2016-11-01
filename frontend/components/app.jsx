import React from 'react';

import HeaderContainer from './header/header_container'
import SideBarContainer from './sidebar/sidebar_container'
import TasksContainer from './tasks/tasks_container'

const App = ({ children }) => (
  <div>
    <h1>Shmasana</h1>
    <HeaderContainer />
    {children}
  </div>
);

export default App;


// <SideBarContainer />
// <TasksContainer />
