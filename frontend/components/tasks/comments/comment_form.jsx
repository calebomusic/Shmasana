import React from 'react';

import TextField from 'material-ui/TextField';
import { PrimaryButton } from '../../session/session_form_buttons';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';

import {
  lightBlue200,
  lightBlue500,
  lightRed200,
  grey50,
  grey600,
  deepPurple50,
  red500,
  blue500,
  redA400,
  pink400 } from 'material-ui/styles/colors';

class CommentForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { body: ''};

    this.updateForm = this.updateForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.renderAvatar = this.renderAvatar.bind(this);
  }

  updateForm(e) {
    this.setState({body: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();

    const taskId = this.props.task.id;
    const body = this.state.body;

    const comment = {body: body, task_id: taskId};

    this.setState({body: ''});

    this.props.createComment(comment);
  }
  disableButton() {}

  renderAvatar() {
    let letter, color;

    if (this.props.currentUser) {
      letter = this.props.currentUser.username[0];
      color = colors[letter.charCodeAt() % 4];
    }

    return(
          <Avatar
            color={deepPurple50}
            backgroundColor={color}
            size={30}
            style={avatarStyle} >
            {letter}
          </Avatar>
        )
  }

  render() {
    return(
      <div className='comment-form'>
        <form onSubmit={this.handleSubmit}>
          <div className='comment-form-avatar'>
            {this.renderAvatar()}
          </div>
          <div className='comment-form-input'>
            <TextField
            hintText="Write a comment..."
            value={this.state.body}
            onChange={this.updateForm}
            multiLine={true} underlineShow={false}
            rows={2}
            rowsMax={2}
            fullWidth = {true} />
          </div>
          <button type='submit' className='comment-button'>
            COMMENT
          </button>
        </form>
      </div>)
  }
}

  const colors = [red500, blue500, redA400, pink400];
  const avatarStyle = {margin: 0};

export default CommentForm;
