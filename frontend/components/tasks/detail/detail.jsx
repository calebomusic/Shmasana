import React from 'react';
import { withRouter, hashHistory } from 'react-router';

import Spinner from '../../spinner';
import CommentFormContainer from '../comments/comment_form_container';
import CommentListContainer from '../comments/comment_list_container';
import DetailHeaderContainer from './detail_header_container';
import DetailProjectContainer from './detail_project_container';
import DetailContentContainer from './detail_content_container';
import DetailFooter from './detail_footer';

class Detail extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (!this.props.task.title) {
      const taskId = this.props.params.taskId
      this.props.fetchTask(taskId);
    }
  }

  render() {
    if (this.props.loading) {
      return(<div className='task-detail'>

        <div className='detail-spinner'>
          <Spinner />
        </div>
      </div>)
    } else {
      return(
        <div className='task-detail'>
          <DetailHeaderContainer />
          <div className='task-detail-body'>
            <DetailProjectContainer />
            <div className='task-detail-content'>
              <DetailContentContainer />
            </div>
          </div>
          <DetailFooter task={this.props.task} />
          <CommentListContainer />
          <CommentFormContainer />
        </div>
      )
    }
  }
}

export default withRouter(Detail);
