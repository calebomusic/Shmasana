import React from 'react';
import Shepherd from 'tether-shepherd';

import AllHeaders from './header/all_headers';
import SideBarContainer from './sidebar/sidebar_container'
import TaskListContainer from './tasks/task_list_container';
import UserTour from './tour';

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    
  }

  render() {
    return(
      <div className='app'>
        <SideBarContainer />
        <div className='main-content'>
          <AllHeaders />
          <div className='tasks'>
            <TaskListContainer />
            {this.props.children}
          </div>
        </div>
      </div>)
  }
}

export default App;
