import React from 'react';
import Modal from 'react-modal';
import { withRouter } from 'react-router';

import { PrimaryButton } from '../session/session_form_buttons';

class CreateProjectModal extends React.Component {
  constructor(props) {
    super(props)

    if (this.props.actionDropdown) {
      this.state = { name: '', modalOpen: true }
    } else {
      this.state = { name: '', modalOpen: false }
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateForm = this.updateForm.bind(this);
    this.renderButton = this.renderButton.bind(this);
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

    this.closeModal();
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

  renderButton() {
    if (!this.props.actionDropdown) {
      return(
        <button className='smaller-sidebar-button'
                      onTouchTap={this.openModal}>
           +
        </button>)
    } else {
      return(<div></div>)
    }
  }

  render(){
      return(
      <div className='create-project-modal'>
        {this.renderButton()}
      <Modal isOpen={this.state.modalOpen}
             onRequestClose={this.closeModal}
             className='create-project-form-modal'
             style={style}>
        <div>
          <div className='create-project-form'>
            <div className='create-project-header'>
              <h1 className='create-project-title'>New Project</h1>
              <div className='create-project-close'
                   onTouchTap={this.closeModal}>
                    x
              </div>
            </div>

            <form onSubmit={this.handleSubmit}>
              <label className='session-label'>PROJECT NAME</label>
              <input className='create-project-input'
                     value={this.state.username}
                     onChange={this.updateForm('name')}>
              </input>

              <PrimaryButton type='submit'
                             label='Create'
                             disabled={this.disableButton()}/>
            </form>
          </div>
        </div>
      </Modal>
      </div>
    )
  }
}

  const style = {
    overlay : {
      position          : "fixed",
      top               : 0,
      left              : 0,
      right             : 0,
      bottom            : 0,
      backgroundColor   : 'rgba(255, 255, 255, 0.75)',
    },
    content : {
      position                   : 'absolute',
      top                        : '118px',
      left                       : '300px',
      right                      : '40px',
      bottom                     : '40px',
      border                     : '1px solid #ccc',
      background                 : '#fff',
      overflow                   : 'auto',
      WebkitOverflowScrolling    : 'touch',
      borderRadius               : '4px',
      outline                    : 'none',
      padding                    : '25px',
      width                      : '405px',
      height                      : '200px',
    }
  }

export default withRouter(CreateProjectModal);
