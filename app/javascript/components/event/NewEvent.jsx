import React from 'react';
import Axios from 'axios';
import EventForm from './EventForm';

export default class NewEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { event: { name: '', description: '', status: '', date: '', event_layouts_attributes: { virtual_map: null } } };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    let userRole;
    if (localStorage.user !== undefined) {
      userRole = JSON.parse(localStorage.user_attributes).role;
    }
    if (userRole !== 'organizer') {
      this.props.history.push('/events');
    }
  }

  handleSubmit = (e, event) => {
    e.preventDefault();

    let headers = {};
    if (localStorage.user) {
      headers = JSON.parse(localStorage.user);
    }
    debugger
    const data = new FormData();
    data.append('event[name]', event.name);
    data.append('event[description]', event.description);
    data.append('event[status]', event.status);
    data.append('event[date]', event.date);
    data.append('event[event_layouts_attributes][virtual_map]', event.event_layouts_attributes.virtual_map);


    headers['X-CSRF-Token'] = document.querySelector('meta[name=\'csrf-token\']').getAttribute('content');
    Axios({
      method: 'post',
      url: '/api/v1/events', 
      data: data, 
      headers: headers })
      .then(response => this.props.history.push(`/events/${response.data.id}`))
      .catch(error => {
        switch (error.response.statusText) {
        case 'Unprocessable Entity':
          this.setState({ errors: error.response.data });
          break;
        case 'Unauthorized':
          this.setState({ errors: error.response.data.errors });
          break;
        }
      }
      );
  }

  handleCancel = () => {
    this.props.history.push('/events');
  }

  render() {
    return (
      <div>
        <EventForm event={this.state.event} errors={this.state.errors} handleSubmit={this.handleSubmit} handleCancel={this.handleCancel} />
      </div>
    );
  }
}
