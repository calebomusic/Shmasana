const style = {
  margin: 12,
  border: '1px'
};

const primaryStyle = {
  padding: '0px',
  width: '0px',
  marginTop: '25px',
  marginLeft: '78%',
  border: '1px',
  textAlign: 'right'
};

const footerButton = {
  margin: 12,
  height: 10,
  // backgroundColor: 'transparent',
  color: 'white'
};

// export default { primaryButton, footerButton }
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';

export const PrimaryButton = (props) => (
  <RaisedButton label={props.label} type={props.type}
    backgroundColor='#03A9F4' labelColor='white'
    style={primaryStyle} disabled={props.disabled}/>
)

export const FooterButton = (props) => (
  <RaisedButton label={props.label} onClick={props.onClick}
    style={style}/>
)
