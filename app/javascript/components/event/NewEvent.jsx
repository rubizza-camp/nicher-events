import React from 'react';
import Axios from 'axios';
import EventForm from './EventForm';

export default class NewEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { event: { name: '', description: '', status: '', date: '' } };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    let userRole;
    if (sessionStorage.user !== undefined) {
      userRole = JSON.parse(sessionStorage.user_attributes).role;
    }
    if (userRole !== 'organizer') {
      this.props.history.push('/events');
    }
  }

  handleSubmit = (e, event) => {
    e.preventDefault();
    let headers = {};
    if (sessionStorage.user) {
      headers = JSON.parse(sessionStorage.user);
    }
    headers['X-CSRF-Token'] = document.querySelector('meta[name=\'csrf-token\']').getAttribute('content');
    Axios.post('/api/v1/events', event, { headers: headers })
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
