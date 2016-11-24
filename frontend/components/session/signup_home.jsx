import React from 'react';
import { hashHistory } from 'react-router';

import RaisedButton from 'material-ui/RaisedButton';
import { GetStarted, Login, Demo } from './signup_home_buttons';
import SignUpFormModal from './signup_form_modal';

class SignUpHome extends React.Component {
  constructor(props) {
    super(props)
  };

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
          <div className='signup-header-left'>shmasana</div>
          <div className='signup-header-right'>
            <Demo login={this.props.login} />
            <SignUpFormModal processForm={this.props.processForm}   errors={this.props.errors}/>
            <Login />
          </div>

        </div>
        <div className='message'>
          <div className='message-title'>Move work forward</div>
          <div className='message-subtitle'>Shmasana is the easiest way for teams to track their work—and get shmresults.</div>
        </div>
        <footer><div></div></footer>
      </div>)

  }
}

export default SignUpHome;
