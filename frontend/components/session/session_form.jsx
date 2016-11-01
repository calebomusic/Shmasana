import React from 'react';
import { hashHistory } from 'react-router';

import RaisedButton from 'material-ui/RaisedButton';
// import style from './session_style';
import {PrimaryButton, FooterButton} from './session_style';


class SessionForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {username: '', password: ''};

    this.disableButton = this.disableButton.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateForm = this.updateForm.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.logIn = this.logIn.bind(this);
    this.signUp = this.signUp.bind(this);
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
    if(this.state.username.length > 0 || this.state.password.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  signUp(e) {
    e.preventDefault();
    hashHistory.push('/signup');
  }

  logIn(e) {
    e.preventDefault();
    hashHistory.push('/login');
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

  render(){
    return(
      <div className='session'>
        <h1>{this.props.formType}</h1>

        <p className='or'>or</p>

        <ul className='errors'>{this.props.errors.responseText}</ul>

        <form onSubmit={this.handleSubmit} className='session-form'>
          Username:
          <input className='session-input' value={this.state.username} onChange={this.updateForm('username')}></input>
          Password:
          <input className='session-input' value={this.state.password} type='password' onChange={this.updateForm('password')}></input>
          <PrimaryButton type='submit' label={this.props.formType} disabled={this.disableButton()}/>
        </form>

        {this.renderFooter()}
      </div>)
  }
}

export default SessionForm;
