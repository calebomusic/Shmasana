import { connect } from 'react-redux';
import { login} from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = (state) => (
  {
    loggedIn: state.session.currentUser === null,
    errors: state.session.errors
  }
)

const mapDispatchToProps = (dispatch, ownProps) => (
  {
    formType: 'Log In',
    processForm: (user) => dispatch(login(user))
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps)(SessionForm);
