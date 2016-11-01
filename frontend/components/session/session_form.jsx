import React from 'react';
import { hashHistory } from 'react-router';

import RaisedButton from 'material-ui/RaisedButton';
// import style from './session_style';
import {PrimaryButton, FooterButton} from './session_style';


class SessionForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {email: '', password: ''};

    this.disableButton = this.disableButton.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateForm = this.updateForm.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.logIn = this.logIn.bind(this);
    this.signUp = this.signUp.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    // this.renderEmailInput = this.renderEmailInput.bind(this);
  };

  handleSubmit(e) {
    e.preventDefault();
    const user = this.state;
    this.props.processForm({user});
  }

  updateForm(property){
    return (e) => this.setState({[property]: e.target.value})
  }

  disableButton(){
    if(this.state.email.length > 0 && this.state.password.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  signUp(e) {
    e.preventDefault();
    hashHistory.replace('/signup');
  }

  logIn(e) {
    e.preventDefault();
    hashHistory.replace('/login');
  }

  renderFooter(){
    if(this.props.formType === 'Log In') {
      return(<div className='{this.formType}-footer'>
      Don’t have an account?
      <FooterButton onClick={this.signUp}
        label='Sign up'/>
      </div>)
    } else {
      return(<div className='{this.formType}-footer'>
      Already have an account?
      <FooterButton onClick={this.logIn}
        label='Log in'/>
      </div>)
    }
  }

  // renderEmailInput(){
  //   if(this.props.formType === 'Sign Up') {
  //     return(<div>
  //     <label className='session-label'>EMAIL</label>
  //     <input className='session-input' value={this.state.email}
  //       onChange={this.updateForm('email')}></input>
  //     </div>)
  //   }
  // }

  renderErrors() {
    debugger
    if(this.props.errors.length > 0) {
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
      <div className='session'>
        <div className='session-form'>

          <h1 className='session-title'>{this.props.formType}</h1>

          <div className='or'><hr /><p>or</p><hr /></div>

          {this.renderErrors()}

          <form onSubmit={this.handleSubmit}>
            <label className='session-label'>EMAIL</label>
            <input className='session-input' value={this.state.email}
              onChange={this.updateForm('email')}></input>

            <label className='session-label'>PASSWORD</label>
            <input className='session-input' value={this.state.password} type='password'
              onChange={this.updateForm('password')}></input>
            <PrimaryButton className='session-form-button' type='submit' label={this.props.formType}
              disabled={this.disableButton()}/>
          </form>
        </div>
          <footer className='session-footer'>{this.renderFooter()}</footer>
        </div>)

  }
}

export default SessionForm;
