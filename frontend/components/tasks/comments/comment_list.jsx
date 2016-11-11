import React from 'react';
import {
  lightBlue200, lightBlue500, lightRed200, grey50, grey600, deepPurple50, red500, blue500, redA400, pink400
} from 'material-ui/styles/colors';

const colors = [red500, blue500, redA400, pink400]
const avatarStyle = {margin: 0};

import Avatar from 'material-ui/Avatar';

class CommentList extends React.Component {
  constructor(props) {
    super(props)
    this.renderCommentList = this.renderCommentList.bind(this);
    this.parseDate = this.parseDate.bind(this);
    this.renderAvatar = this.renderAvatar.bind(this);
  }

  renderAvatar(comment) {
    console.log(comment);
    let author = comment.author;

    const letter = author.username[0];
    const color = colors[letter.charCodeAt() % 4];


    return(
          <Avatar
            color={deepPurple50}
            backgroundColor={color}
            size={25}
            style={avatarStyle}
          >
          {letter}
          </Avatar>
        )
  }

  parseDate(date) {
    date = new Date(date).toDateString().split(' ');
    const month = date[1];
    const day = parseInt(date[2]);

    return month + ' ' + day
  }

  renderCommentList() {
    if (this.props.task.comments) {
      return this.props.task.comments.map((comment) => (
        <li key={comment.id} className='comment'>
          <div className='comment-title-body-avatar'>
            <div className='comment-avatar'>
            {this.renderAvatar(comment)}
            </div>
            <div className='comment-title-and-body'>
              <div className='comment-title'>
              {comment.author.username}
              <div className='comment-date'>
                {this.parseDate(comment.created_at)}
              </div>
              </div>
              <div className='comment-body'>
                {comment.body}
              </div>
            </div>
          </div>
        </li>
      ))
    }
  }

  render() {
    return(<ul className='comment-list'>
      {this.renderCommentList()}
    </ul>)
  }
}

export default CommentList;
