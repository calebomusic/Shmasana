import React from 'react';

import AllHeaders from './header/all_headers';
import SideBarContainer from './sidebar/sidebar_container'

const App = ({ children }) => (
  <div className='app'>
    <SideBarContainer />
    <div className='main-content'>
      <AllHeaders />
      {children}
    </div>
  </div>
);

export default App;
