import React from 'react';
import Modal from 'react-modal';
import { withRouter } from 'react-router';

import { PrimaryButton } from '../session/session_form_buttons';

class CreateProjectModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = { name: '', modalOpen: false }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateForm = this.updateForm.bind(this);
  }

  closeModal() {
    this.setState({ modalOpen: false })
  }

  openModal() {
    this.setState({ modalOpen: true })
  }

  handleSubmit(e) {
    e.preventDefault();

    const project = {
      name: this.state.name,
      workspace_id: parseInt(this.props.router.params.workspaceId)
    };

    this.props.createProject(project);
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


  render(){
    return(
      <div className='create-project-modal'>
        <button className='smaller-sidebar-button' onTouchTap={this.openModal}>
          +
        </button>
      <Modal isOpen={this.state.modalOpen} onRequestClose={this.closeModal} className='create-project-form-modal'>
        <div>
          <div className='signup-form'>
            <div className='signup-close-modal' onTouchTap={this.closeModal}>x</div>
            <h1 className='signup-title'>New Project</h1>

            <form onSubmit={this.handleSubmit}>
              <label className='session-label'>PROJECT NAME</label>
              <input className='signup-input' value={this.state.username}
                onChange={this.updateForm('name')}></input>

              <PrimaryButton className='login-form-button' type='submit' label='Create'
                disabled={this.disableButton()}/>
            </form>
          </div>
        </div>
      </Modal>
    </div>
    )
  }
}

export default withRouter(CreateProjectModal);
