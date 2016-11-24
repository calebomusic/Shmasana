import React from 'react';
import {hashHistory} from 'react-router';

import Modal from 'react-modal'
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 10
};

const getStartedStyle = {
  margin: 11,
  width: '200px'
};

const loginStyle = {
  margin: 10,
  border: '1px',
  borderColor: '#6a67ce'
};

const demoStyle = {
  margin: 10
};

export const GetStarted = (props) => (
  <RaisedButton label='Get Started for Free'
                backgroundColor='#6a67ce'
                labelColor='white'
                style={getStartedStyle}
                onTouchTap={props.onTouchTap} />
)

export const Demo = (props) => {
  const _loginDemoUser = () => {
    props.login({ user: { email: 'shmalebomusic@gmail.com',
                          password: 'password'}});
  }

  return(<RaisedButton label='Demo'
    style={demoStyle} onTouchTap={_loginDemoUser}/>)
}


export const Login = (props) => (
  <RaisedButton label='Log In'
                onTouchTap={_redirectToLogin}
                style={loginStyle}/>
)

const _redirectToLogin = () => {
  hashHistory.push('/login')
}
