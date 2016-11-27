import { connect } from 'react-redux';

import CommentList from './comment_list';

import { createComment } from '../../../actions/comment_actions';

const mapStateToProps = (state) => (
  {
    currentUser: state.session.currentUser,
    task: state.task.present
  }
)


const mapDispatchToProps = (dispatch) => (
  {
    createComment: (comment) => dispatch(createComment(comment)),
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps)(CommentList);
