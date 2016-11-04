import React from 'react';
import DrawerIcon from 'material-ui/svg-icons/action/reorder';
import FlatButton from 'material-ui/FlatButton';


const style = {
  width: '400px',
  height: '40px',
  verticalAlign: 'center',
  borderRight: '1px solid',
  borderColor: '#EFF0F1',
}

class SideBar extends React.Component {
  constructor() {
    super()
    this.state = {open: true};
    this.handleToggle = this.handleToggle.bind(this);
    this.renderOpenSidebar = this.renderOpenSidebar.bind(this);
    this.renderTeamates = this.renderTeamates.bind(this);
  }

  handleToggle() {
    this.setState({open: !this.state.open})
  }

  renderOpenSidebar() {
    return(
      <div className='sidebar'>
        <div className='logo-exit'>
          <span className='sidebar-logo'>shmasana</span>
          <span className='sidebar-exit'>x</span>
        </div>
          {this.renderTeamates()}
          {this.renderProjects()}
      </div>
    )
  }

  renderTeamates() {
    // return 'invite people' w/ up to 3 pictures and the + sign. Else return + sign with 6 pictures
    return(<div className='sidebar-teammates'>
      <div className='teammates-left'>
        x
      </div>
      <div className='teammates-right'>
          <p>Invite People</p>
        <button className='larger-sidebar-button'>+</button>
      </div>
    </div>)
  }

  renderProjects() {
    return(<div className='sidebar-projects'>
    <div className='projects-title-and-button'>
      <p>PROJECTS</p>
      <button className='smaller-sidebar-button'>+</button>
    </div>
    <ul className='project-list'>
      <li><p>Dummy Project</p></li>
      <li><p>Dumb Project</p></li>
    </ul>
    </div>)
  }
  render() {
    if (this.state.open) {
      return this.renderOpenSidebar();
    } else {
      return(<div className='sidebar-button'>
        <FlatButton
          label={<DrawerIcon />}
          onTouchTap={this.handleToggle}
          style={style} />
      </div>)
    }
  }
}

export default SideBar;
