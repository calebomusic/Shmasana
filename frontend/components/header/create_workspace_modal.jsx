import React from 'react';
import { withRouter } from 'react-router';
import Modal from 'react-modal';

import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { PrimaryButton } from '../session/session_form_buttons';

class CreateWorkspaceModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = { name: "", modalOpen: true }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateForm = this.updateForm.bind(this);
    this.renderErrors = this.renderErrors.bind(this);

  }

  closeModal() {
    this.setState({ modalOpen: false })
  }

  openModal() {
    this.setState({ modalOpen: true })
  }

  handleSubmit(e) {
    e.preventDefault();
    const workspace = {
      name: this.state.name
    };

    this.closeModal();
    this.props.createWorkspace(workspace);
  }

  updateForm(property){
    return (e) => this.setState({[property]: e.target.value})
  }

  disableButton(){
    if(this.state.name.length > 0) {
      return false;
    } else {
      return true;
    }
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
      <div>
          <Modal isOpen={this.state.modalOpen} onRequestClose={this.closeModal} >
            <div>
            <div className='create-workspace-header'>
              <div className='create-workspace-title'>Create Your WorkSpace</div>
              <div className='create-workspace-close-modal' onTouchTap={this.closeModal}>x</div>
            </div>
              <form onSubmit={this.handleSubmit} className='create-workspace-form' >
                <div className='create-workspace-label-input'>
                <label className='create-workspace-label'>WORKSPACE NAME</label>
                <input className='create-workspace-input' value={this.state.name}
                  placeholder='Company or Team Name'
                  onChange={this.updateForm('name')}></input>
                </div>
                  <PrimaryButton className='create-workspace-button' type='submit' label='Create'
                   disabled={this.disableButton()} />
              </form>
              </div>
          </Modal>
    </div>
    )
  }
}

// Add way to add members!
export default withRouter(CreateWorkspaceModal);
