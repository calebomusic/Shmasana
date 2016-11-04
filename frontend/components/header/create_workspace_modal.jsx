import React from 'react';
import Modal from 'react-modal';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import PrimaryButton from '../session/signup_home_buttons';

class CreateWorkspaceModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = { name: "", modalOpen: false }

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

    this.props.createWorkspace(workspace);
  }

  updateForm(property){
    return (e) => this.setState({[property]: e.target.value})
  }

  disableButton(){
    if(this.state.email.length > 0
      && this.state.password.length > 0
        && this.state.username.length > 0) {
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
      <div className='signup-form-modal'>
        <MenuItem primaryText="Create WorkSpace" onTouchTap={this.openModal} />
      <Modal isOpen={this.state.modalOpen} onRequestClose={this.closeModal} className='login-form-modal'>

          <div>
            <div>Create Your WorkSpace</div>
            <div className='signup-close-modal' onTouchTap={this.closeModal}>x</div>


               <form onSubmit={this.handleSubmit}>
                 <label className='session-label'>WORKSPACE NAME</label>
                 <input className='signup-input' value={this.state.name}
                   onChange={this.updateForm('name')}></input>
                 <label className='session-label'>MEMBERS</label>
                   <input className='signup-input' value={this.state.name}
                     onChange={this.updateForm('name')}></input>
                   <PrimaryButton className='login-form-button' type='submit' label='Create Workspace' />
               </form>
        </div>
      </Modal>
    </div>
    )
  }
}

// Add way to add members!
export default CreateWorkspaceModal;
