import React from 'react';

class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = { assignee: '' }
  }

  componentWillMount() {

  }

  

  renderTaskDetailHeader() {

    return(<div className='task-detail-header'>
      <div className='task-detail-username'>{this.task.title}</div>
      <div className='task-detail-due-date'>Duedate?</div>
      <div className='task-detail-options'>Delete</div>
      <div className='task-detail-close'>x</div>
    </div>)
  }

  render() {
    return(
      <div className='task-detail'>

        <div className='task-detail-body'>
          <div className='task-detail-project'></div>
          <div className='task-detail-content'>
            <div className='task-detail-title'></div>
            <div className='task-detail-description'></div>
          </div>
        </div>
        <footer className='task-detail-footer'></footer>
      </div>
    )
  }
}

export default Detail;
