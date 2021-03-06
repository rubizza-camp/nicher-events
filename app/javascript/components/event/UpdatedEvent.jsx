import React from 'react';
import Axios from 'axios';
import EventForm from './EventForm';

export default class UpdatedEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { event: {name: '', description: '', status: '', date: ''} };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleRedirect() {
    let userRole;
    if (localStorage.user !== undefined) {
      userRole = JSON.parse(localStorage.user_attributes).role;
    }
    if (userRole !== 'organizer') {
      this.props.history.push('/events');
    }
  }

  componentDidMount() {
    this.handleRedirect();
    let headers = {};
    if (localStorage.user) {
      headers = JSON.parse(localStorage.user);
    }
    Axios.get(`/api/v1/events/${this.props.match.params.id}`, {
      headers: headers
    })
      .then(res => this.setState({ event: res.data }));
  }

  handleSubmit = (e, event) => {
    e.preventDefault();
    let headers = {};
    if (localStorage.user) {
      headers = JSON.parse(localStorage.user);
    }
    headers['X-CSRF-Token'] = document.querySelector('meta[name=\'csrf-token\']').getAttribute('content');
    Axios.patch(`/api/v1/events/${this.props.match.params.id}`, { event: event }, { headers: headers })
      .then(() => this.props.history.push(`/events/${this.state.event.id}`))
      .catch(error => {
        switch (error.response.statusText) {
        case 'Unprocessable Entity':
          this.setState({ errors: error.response.data });
          break;
        case 'Unauthorized':
          this.setState({ errors: error.response.data.errors });
          break;
        case 'Not Found':
          this.setState({ errors: ['You can\'t do this'] });
          break;
        }
      });
  }

  handleCancel = () => {
    this.props.history.push(`/events/${this.state.event.id}`);
  }

  render() {
    return (
      <div>
        <EventForm event={this.state.event} errors={this.state.errors} handleSubmit={this.handleSubmit} handleCancel={this.handleCancel} />
      </div>
    );
  }
}
