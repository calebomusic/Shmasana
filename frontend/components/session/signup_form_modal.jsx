import React from 'react';
import Modal from 'react-modal';

import { GetStarted } from './signup_home_buttons';
import { PrimaryButton } from './session_form_buttons';


class SignUpFormModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = { username: "", email: "", password: "", modalOpen: false }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateForm = this.updateForm.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  closeModal() {
    this.setState({ modalOpen: false })
  }

  openModal() {
    this.setState({ modalOpen: true })
  }

  handleSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };

    this.props.processForm({user});
  }

  updateForm(property){
    return (e) => this.setState({[property]: e.target.value})
  }

  disableButton(){
    if(this.state.email.length > 0
      && this.state.password.length > 0
        && this.state.username.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  renderErrors() {
    if(this.props.errors && this.props.errors.length > 0) {
      return(
        <ul className='errors'>
          {this.props.errors.map((error, i) => (
            <li key={`error-${i}`}>
              {error}
            </li>
          ))}
        </ul>)
    }
  }

  render(){
    return(
      <div className='signup-form-modal'>
        <GetStarted onTouchTap={this.openModal}/>
      <Modal isOpen={this.state.modalOpen} onRequestClose={this.closeModal} className='login-form-modal'>
          <div>
            <div className='signup'>
             <div className='signup-form'>
               <div className='signup-close-modal' onTouchTap={this.closeModal}>x</div>
               <h1 className='signup-title'>Sign Up</h1>

               {this.renderErrors()}

               <form onSubmit={this.handleSubmit}>
                 <label className='session-label'>USERNAME</label>
                 <input className='signup-input' value={this.state.username}
                   onChange={this.updateForm('username')}></input>

                 <label className='session-label'>EMAIL</label>
                 <input className='signup-input' value={this.state.email}
                   onChange={this.updateForm('email')}></input>

                 <label className='session-label'>PASSWORD</label>
                 <input className='signup-input' value={this.state.password} type='password'
                   onChange={this.updateForm('password')}></input>
                 <PrimaryButton className='login-form-button' type='submit' label='Sign Up'
                   disabled={this.disableButton()}/>
               </form>
             </div>
            </div>
        </div>
      </Modal>
    </div>
    )
  }
}

export default SignUpFormModal;
