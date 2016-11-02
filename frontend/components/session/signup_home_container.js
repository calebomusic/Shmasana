import { connect } from 'react-redux';
import { signup, login } from '../../actions/session_actions';
import SignUpHome from './signup_home';

const mapStateToProps = (state) => (
  {
    errors: state.session.errors
  }
)

const mapDispatchToProps = (dispatch, ownProps) => (
  {
    formType: 'Sign Up',
    processForm: (user) => dispatch(signup(user)),
    login: (user) => dispatch(login(user))
  }
)


export default connect(
  mapStateToProps,
  mapDispatchToProps)(SignUpHome);
