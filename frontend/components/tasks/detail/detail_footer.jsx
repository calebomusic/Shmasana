import React from 'react';

const DetailFooter = (props) => {
  const parseDate = (date) => {
    date = new Date(date).toDateString().split(' ');
    const month = date[1];
    const day = parseInt(date[2]);

    return month + ' ' + day
  }

  const date = parseDate(props.task.created_at);
  let created, completed;

  if (props.task.author) {
    created = `${props.task.author.username} created task. ${date}`;
  }

  let completor = props.task.assignee ? props.task.assignee.username
                                           : props.task.author
                                            ? props.task.author.username
                                            : '';

  if (props.task.completed) {
    const completedAt = parseDate(props.task.completed_at);
    completed = `${completor} ` + 'completed this task. ' + `${completedAt}`;
  }

  return(
    <footer className='task-detail-footer'>
      {created}
      <br />
      {completed}
    </footer>)
}

export default DetailFooter;
