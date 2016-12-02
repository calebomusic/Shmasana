import React from "react";
import Tour from "react-user-tour";

class UserTour extends React.Component {
    constructor() {
      super();
      this.state = {
          isTourActive: true,
          tourStep: 1
      };

      this.eventFire = this.eventFire.bind(this);
      this.fireClick = this.fireClick.bind(this);
    }

    eventFire(el, etype) {
      if (el.fireEvent) {
        el.fireEvent('on' + etype);
      } else {
        let evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
      }
    }

    fireClick() {
      if (this.state.tourStep === 3 || this.state.tourStep === 4) {
        this.eventFire(document.getElementsByClassName('header-user-dropdown')[0], 'click');
      } else if (this.state.tourStep === 9 || this.state.tourStep === 10) {
        this.eventFire(document.getElementsByClassName('action-dropdown-button')[0], 'click');
      } else if ((this.state.tourStep === 10) || (this.state.tourStep === 4)) {
        this.eventFire(document.getElementsByClassName('subheader')[0], 'click');
      } else if (this.state.tourStep === 13) {
        this.eventFire(document.getElementsByTagName('input')[0], 'focus');
      }
    }

    render() {
      return (
        <div>
            <Tour active={this.state.isTourActive}
                  step={this.state.tourStep}
                  onNext={(step) => this.setState({tourStep: step },
                                                  this.fireClick)}
                  onBack={(step) => this.setState({tourStep: step})}
                  onCancel={() => this.setState({isTourActive: false})}
                  steps={[
                    {
                        step: 1,
                        selector: ".subheader",
                        title: <div style={tourTitleStyle}>Welcome to Shmasana</div>,
                        body: <div style={tourMessageStyle}>Shamasana is an easy way to manage teams, tasks, and get shmresults. Take the tour or get to work!</div>
                    },
                    {
                        step: 2,
                        selector: ".id",
                        title: <div style={tourTitleStyle}>Move Work Forward</div>,
                        body: <div style={tourMessageStyle}>Shmasana is the easiest way for teams to track their work—and get shmresults.</div>
                    },
                    {
                        step: 4,
                        selector: ".id",
                        title: <div style={tourTitleStyle}>Move Work Forward</div>,
                        body: <div style={tourMessageStyle}>Shmasana is the easiest way for teams to track their work—and get shmresults.</div>
                    },
                    {
                        step: 6,
                        selector: ".id",
                        title: <div style={tourTitleStyle}>Move Work Forward</div>,
                        body: <div style={tourMessageStyle}>Shmasana is the easiest way for teams to track their work—and get shmresults.</div>
                    },
                    {
                        step: 8,
                        selector: ".id",
                        title: <div style={tourTitleStyle}>Move Work Forward</div>,
                        body: <div style={tourMessageStyle}>Shmasana is the easiest way for teams to track their work—and get shmresults.</div>
                    },
                    {
                        step: 10,
                        selector: ".id",
                        title: <div style={tourTitleStyle}>Move Work Forward</div>,
                        body: <div style={tourMessageStyle}>Shmasana is the easiest way for teams to track their work—and get shmresults.</div>
                    },
                    {
                        step: 12,
                        selector: ".id",
                        title: <div style={tourTitleStyle}>Move Work Forward</div>,
                        body: <div style={tourMessageStyle}>Shmasana is the easiest way for teams to track their work—and get shmresults.</div>
                    },
                    {
                        step: 14,
                        selector: ".id",
                        title: <div style={tourTitleStyle}>Move Work Forward</div>,
                        body: <div style={tourMessageStyle}>Shmasana is the easiest way for teams to track their work—and get shmresults.</div>
                    },
                    {
                        step: 3,
                        selector: ".home-header-right",
                        title: <div style={tourTitleStyle}>Workspaces</div>,
                        body: <div style={tourMessageStyle}>Here you can add a workspace which you can invite other users to, add projects, and add tasks to.</div>,
                        position: 'left'
                    },
                    {
                        step: 5,
                        selector: ".larger-sidebar-button",
                        title: <div style={tourTitleStyle}>Team Members</div>,
                        body: <div style={tourMessageStyle}>You can invite user members to your new workspace here!
                                                              Once added, the user's avatar will appear here.</div>
                    },
                    {
                        step: 7,
                        selector: ".smaller-sidebar-button",
                        title: <div style={tourTitleStyle}>Projects</div>,
                        body: <div style={tourMessageStyle}>Add projects and navigate to a project here</div>
                    },
                    {
                        step: 9,
                        selector: ".action-dropdown-button",
                        title: <div style={tourTitleStyle}>More Projects and Tasks!</div>,
                        body: <div style={tourMessageStyle}>You can also add a project or a task here! Click on my tasks to see all your tasks in the workspace.</div>,
                        position: 'right'
                    },
                    {
                        step: 11,
                        selector: ".task-list-list",
                        title: <div style={tourTitleStyle}>Task List</div>,
                        body: <div style={tourMessageStyle}>See all tasks here. Sort them by their completion status. Click on one to pull up its details and edit it.</div>
                    },
                    {
                        step: 13,
                        selector: ".task-detail",
                        title: <div style={tourTitleStyle}>Task</div>,
                        body: <div style={tourMessageStyle}>Finally, an individual task! Assign it it to a team member. Edit its name or description. Give it a due date. Complete it!</div>,
                        position: 'left'
                    },
                    {
                        step: 15,
                        selector: ".comment-list",
                        title: <div style={tourTitleStyle}>Comments</div>,
                        body: <div style={tourMessageStyle}>Check out updates from your team members. Add your own!</div>
                    },
                    {
                        step: 16,
                        selector: ".header-user-dropdown",
                        title: <div style={tourTitleStyle}>Shmasana</div>,
                        body: <div style={tourMessageStyle}>Thanks for taking the tour!
                          See more of my projects at my: <a href='https://github.com/calebomusic'
                                                           style={{color: '#2D6285'}}>    GitHub</a> and
                                                        <a href='https://www.linkedin.com/in/caleb-ontiveros-1a23a510a'
                                                           style={{color: '#2D6285'}}>    LinkedIn</a>

                      </div>
                    }
                  ]}
            />
      </div>
    );
  }
}

const tourTitleStyle = {
			fontWeight: 700,
			fontSize: 17,
			paddingTop: 10,
			paddingBottom: 10,
			paddingLeft: 10
		};

		const tourMessageStyle = {
			fontSize: 15,
			paddingLeft: 10
		};

export default UserTour;
