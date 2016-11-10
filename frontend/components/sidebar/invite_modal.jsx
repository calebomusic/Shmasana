import React from 'react';
import Modal from 'react-modal';

import { withRouter } from 'react-router';

import { invite, fetchUserByUsername, fetchUsers } from '../../util/user_api_util';

import { PrimaryButton } from '../session/session_form_buttons';
import AutoComplete from 'material-ui/AutoComplete';


class InviteModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = { username: '', users: [], errors: '', modalOpen: false }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateForm = this.updateForm.bind(this);
    this.invite = invite.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  closeModal() {
    this.setState({ modalOpen: false })
  }

  componentWillMount() {
    const workspaceId = parseInt(this.props.router.params.workspaceId);

    fetchUsers((users) => {
      let newUsers = []
      users.map((user) => {
        if (!user.workspaces.includes(workspaceId)) {
          newUsers.push(user);
        }
      })

      const usernames = newUsers.map( (user) => user.username )

      this.setState({users: usernames})
    })
  }

  openModal() {
    this.setState({ modalOpen: true })
  }

  handleSubmit(e) {
    e.preventDefault();
    // Check if user is an actual user or is not on the team. If not render some error message
    if (this.state.users.includes(this.state.username)) {
      fetchUserByUsername(this.state.username, (user) => {
        invite(user.id, this.props.workspace.id, window.setTimeout(() => this.closeModal(), 2500), (errors) => console.log(errors));
        this.props.fetchWorkspace(this.props.workspace.id)
      }, (errors) => console.log(errors))
    } else {
      this.setState({ errors: 'Woops, no member to invite with that username.'})
    }
  }

  updateForm(username) {
    this.setState({username: username})
  }

  disableButton() {
    if(this.state.username.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  renderErrors() {
    let errors;
    if (this.state.errors) {
      return(<ul className='errors'>
        <li>{this.state.errors}</li>
        </ul>)
    }
  }

  render() {
    return(
      <div className='teammates-right'>
          <p onClick={this.openModal}>Invite People</p>
        <button onClick={this.openModal} className='larger-sidebar-button'>+</button>
          <Modal isOpen={this.state.modalOpen} onRequestClose={this.closeModal} className='create-project-form-modal'>
            <div>
              <div className='signup-form'>
                <div className='signup-close-modal' onTouchTap={this.closeModal}>x</div>
                <h1 className='signup-title'>Invite</h1>
                {this.renderErrors()}
                <form onSubmit={this.handleSubmit}>
                  <AutoComplete floatingLabelText="SEARCH BY MEMBER USERNAME"
                      filter={AutoComplete.fuzzyFilter} dataSource={this.state.users}
                      maxSearchResults={5} fullWidth={false} textFieldStyle={textField}
                      onUpdateInput={this.updateForm} onNewRequest={this.updateForm}/>
                  <PrimaryButton className='login-form-button' type='submit' label='Invite'
                    disabled={this.disableButton()}/>
                </form>
              </div>
            </div>
          </Modal>
    </div>
    )
  }
}

const textField = {
  display: 'block',
  padding: '10px',
  borderRadius: '3px',
  marginTop: '5px',
  width: '96%'
}

export default withRouter(InviteModal);
