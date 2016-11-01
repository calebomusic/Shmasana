import { connect } from 'react-redux';
import { login, signup } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = (state) => (
  {
    loggedIn: state.session.currentUser === null,
    errors: state.session.errors
  }
)

const mapDispatchToProps = (dispatch, ownProps) => {
  let type, process;

  if (ownProps.location.pathname === '/login') {
    type = 'Log In';
    process = (user) => dispatch(login(user));
  } else {
    type = 'Sign Up';
    process = (user) => dispatch(signup(user));
  }

  return({
    formType: type,
    processForm: process
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
