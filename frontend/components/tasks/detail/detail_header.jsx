import React from 'react';

import { hashHistory } from 'react-router';

import Trash from 'material-ui/svg-icons/action/delete';
import DateRange from 'material-ui/svg-icons/action/date-range'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import {
  lightBlue200,
  lightBlue500,
  lightRed200,
  grey50,
  grey600,
  deepPurple50,
  red500,
  blue500,
  redA400,
  pink400
} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import Popover from 'material-ui/Popover';
import Avatar from 'material-ui/Avatar';


class DetailHeader extends React.Component {
  constructor(props) {
    super(props)

    this.state = { assigneeListOpen: false };

    this.closeDetail = this.closeDetail.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.renderAssignee = this.renderAssignee.bind(this);
    this.toggleAssigneeList = this.toggleAssigneeList.bind(this);
    this.renderAssigneeList = this.renderAssigneeList.bind(this);
    this.handleAssigneeChange = this.handleAssigneeChange.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.renderAvatar = this.renderAvatar.bind(this);
    this.findAssignee = this.findAssignee.bind(this);
  }

  componentDidMount() {
    this.setState({ dueDate: this.props.dueDate,
                    assignee: this.props.task.assignee });
  }

  componentWillReceiveProps(newProps) {
    this.setState({ dueDate: this.props.dueDate,
                    assignee: this.props.task.assignee });
  }

  parseDate(date) {
    date = new Date(date).toDateString().split(' ');
    const month = date[1];
    const day = parseInt(date[2]);

    return month + ' ' + day
  }

  renderAssignee() {
    let assingneeList;

    if (this.state.assigneeListOpen) {
      assingneeList = this.renderAssigneeList();
    } else {
      assingneeList = this.renderAvatar();
    }

    return(
      <div className='task-detail-assignee'>
        {assingneeList}
      </div>)
  }

  renderAvatar() {
    let assignee = this.findAssignee(this.props.task.assignee_id);
    if (assignee) {
      let letter = assignee.username[0]
      let color = colors[letter.charCodeAt() % 4];

      return(
            <Avatar
              color={deepPurple50}
              backgroundColor={color}
              size={40}
              style={avatarStyle}
              onTouchTap={this.toggleAssigneeList}
            >
            {letter}
            </Avatar>
          )
    } else {
      return(
        <Avatar
          color={deepPurple50}
          backgroundColor={grey50}
          size={40}
          style={avatarStyle}
          onTouchTap={this.toggleAssigneeList}>
          ?
        </Avatar>)
    }
  }

  toggleAssigneeList() {
    this.setState({assigneeListOpen: !this.state.assigneeListOpen})
  }

  renderAssigneeList() {
    let assignees

    if (this.props.workspace) {
      assignees = this.props.workspace.team.map( (assignee) => (
        <MenuItem value={assignee}
                  primaryText={assignee.username} />
      ))
    }

    return(
      <DropDownMenu
        value={this.state.assignee}
        style={assigneeStyle}
        onChange={this.handleAssigneeChange('assignee_id')}
        autoWidth={false}
        openImmediately={true}>
          <MenuItem value={''}
                    primaryText='Unassigned' />
          {assignees}
      </DropDownMenu>)
  }

  deleteTask() {
    this.closeDetail();
    this.props.deleteTask(this.props.task.id);
    this.props.removeTask();
  }

  closeDetail() {
    this.props.removeTask();

    const userId = this.props.task.author_id;
    const workspaceId = this.props.task.workspace_id;
    const projectId = this.props.task.project_id;
    const taskId = this.props.task.id;

    let location;

    if (projectId) {
      location = `${userId}/${workspaceId}/${projectId}`;
    } else {
      location = `${userId}/${workspaceId}/`;
    }

    hashHistory.push(location)
  }

  handleDateChange(e, date) {
    this.props.task.due_date = date;
    this.setState({dueDate: this.parseDate(date) })
    this.props.updateTask(this.props.task);
  }

  handleAssigneeChange(field) {
    return (e, i, value) => {
      if (field === 'assignee_id') {
        this.toggleAssigneeList();
      } else {
        this.toggleProjectList();
      }

      let assigneeId;

      if (value) {
        assigneeId = value.id;
      } else {
        assigneeId = null;
      }

      this.props.task[field] = assigneeId;
      this.props.updateTask(this.props.task);
    }
  }

  findAssignee(id) {
    if (this.props.workspace) {
    const team = this.props.workspace.team;
      for (var i = 0; i < team.length; i++) {
        if (id === team[i].id) {
          return team[i];
        }
      }
    }
  }

  render() {
    const dueDate = this.props.task.due_date ? this.parseDate(this.props.task.due_date) : 'Due Date'
    const assignee = this.props.task.assignee ? this.props.task.assignee.username : 'Unassigned'

    return(
      <div className='task-detail-header'>
        <div className='task-detail-username'>{this.renderAssignee()}</div>
        <div className='task-detail-due-date'>
          <DatePicker hintText={dueDate}
                      value={this.state.dueDate}
                      onChange={this.handleDateChange}
                      container="inline"
                      inputStyle={{
                        color: lightBlue200,
                        secondaryTextColor: lightBlue200,
                        textColor: lightBlue200}}
                      textFieldStyle={{
                        color: lightBlue200,
                        textColor: grey600,
                        secondaryTextColor: lightBlue200,
                        width: '65px'}}>
          </DatePicker>
        </div>
        <div className='task-detail-delete'
             onTouchTap={this.deleteTask}>
          <Trash color={grey600}
                 hoverColor={grey50}/>
          </div>
        <div className='task-detail-close'
             onTouchTap={this.closeDetail}>x</div>
    </div>)
  }
}

const assigneeStyle = {
  width: '150px',
  display: 'flex',
  flexDirection: 'column'
}

const colors = [red500, blue500, redA400, pink400]
const avatarStyle = {margin: 0};

export default DetailHeader;
