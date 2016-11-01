const style = {
  margin: 12,
  border: '1px'
};

// const footerButton = {
//   margin: 12,
//   height: 10
// };

// export default { primaryButton, footerButton }
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';

export const PrimaryButton = (props) => (
  <RaisedButton label={props.label} type={props.type}
    backgroundColor='#03A9F4' labelColor='white'
    style={style} disabled={props.disabled}/>
)

export const FooterButton = (props) => (
  <RaisedButton label={props.label} onClick={props.onClick}
    style={style}/>
)
