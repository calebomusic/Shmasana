import React from 'react';
import { hashHistory } from 'react-router';

import RaisedButton from 'material-ui/RaisedButton';
import {GetStarted, Login, Demo} from './signup_home_buttons';
import SignUpFormModal from './signup_form_modal';


class SignUpHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {email: '', password: ''};

    this.disableButton = this.disableButton.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateForm = this.updateForm.bind(this);
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
      <div className='signup-home'>
        <div className='signup-header'>
          <div className='signup-header-left'>Shmasana</div>
          <div className='signup-header-right'>
            <Demo />
            <SignUpFormModal processForm={this.props.processForm} errors={this.props.errors}/>
            <Login />
          </div>

        </div>
        <div className='message'>
          <div className='message-title'>Move work forward</div>
          <div className='message-subtitle'>Shmasana is the easiest way for teams to track their work—and get shmresults.</div>
        </div>
      </div>)

  }
}

export default SignUpHome;

// return(
//   <div className='session'>
//     <div className='session-form'>
//
//       <h1 className='session-title'>{this.props.formType}</h1>
//
//       <div className='or'><hr /><p>door</p><hr /></div>
//
//       {this.renderErrors()}
//
//       <form onSubmit={this.handleSubmit}>
//         <label className='session-label'>EMAIL</label>
//         <input className='session-input' value={this.state.email}
//           onChange={this.updateForm('email')}></input>
//
//         <label className='session-label'>PASSWORD</label>
//         <input className='session-input' value={this.state.password} type='password'
//           onChange={this.updateForm('password')}></input>
//         <PrimaryButton className='session-form-button' type='submit' label={this.props.formType}
//           disabled={this.disableButton()}/>
//       </form>
//     </div>
//       <footer className='session-footer'>{this.renderFooter()}</footer>
//     </div>
