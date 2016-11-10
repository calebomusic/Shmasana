import React from 'react';
import Modal from 'react-modal';

import { withRouter } from 'react-router';

import { invite, fetchUserByUsername } from '../../util/user_api_util';

import { PrimaryButton } from '../session/session_form_buttons';

class InviteModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = { username: '', modalOpen: false }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateForm = this.updateForm.bind(this);
    this.invite = invite.bind(this);
  }

  closeModal() {
    this.setState({ modalOpen: false })
  }

  openModal() {
    this.setState({ modalOpen: true })
  }

  handleSubmit(e) {
    e.preventDefault();

    // Check if user is an actual user. If not render some error message

    fetchUserByUsername(this.state.username, (user) => {
        invite(user.id, this.props.workspace.id, window.setInterval(() => this.closeModal(), 2500), (errors) => console.log(errors));
        this.props.fetchWorkspace(this.props.workspace.id)
      }, (errors) => console.log(errors)
    )
  }

  updateForm(property){
    return (e) => this.setState({[property]: e.target.value})
  }

  disableButton(){
    if(this.state.username.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  render(){
    return(
      <div className='teammates-right'>
          <p onClick={this.openModal}>Invite People</p>
        <button onClick={this.openModal} className='larger-sidebar-button'>+</button>
          <Modal isOpen={this.state.modalOpen} onRequestClose={this.closeModal} className='create-project-form-modal'>
            <div>
              <div className='signup-form'>
                <div className='signup-close-modal' onTouchTap={this.closeModal}>x</div>
                <h1 className='signup-title'>Invite</h1>

                <form onSubmit={this.handleSubmit}>
                  <label className='session-label'>MEMBER NAME</label>
                  <input className='signup-input' value={this.state.username}
                    onChange={this.updateForm('username')}></input>

                  <PrimaryButton className='login-form-button' type='submit' label='Invite'
                    disabled={this.disableButton()}/>
                </form>
              </div>
            </div>
          </Modal>
    </div>
    )
  }
}

export default withRouter(InviteModal);
