import React from 'react';
import TaskListContainer from './list/list'
import TaskDetailContainer from './detail/detail'

export default () => (
  <div className='tasks'>
    <TaskListContainer />
    <TaskDetailContainer />
  </div>
)
// This is probably where we should also render a calender container, if calendar view is selected.
