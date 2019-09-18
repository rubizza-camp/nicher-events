import React from 'react';
import Axios from 'axios';
import EventForm from './EventForm';

export default class UpdatedEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { event: {name: '', description: '', status: '', date: new Date(), event_layouts_attributes: { virtual_map: null } },
      prev_event: {name: '', description: '', status: '', date: new Date()} };
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

    Axios({
      method: 'get',
      url: `/api/v1/events/${this.props.match.params.id}`,
      headers: headers
    })
      .then(res => { this.setState({ prev_event: res.data });});
  }

  handleSubmit = (e, event) => {
    e.preventDefault();
    let headers = {};
    if (localStorage.user) {
      headers = JSON.parse(localStorage.user);
    }
    const data = new FormData();
    data.append('event[name]', event.name);
    data.append('event[description]', event.description);
    data.append('event[status]', event.status);
    data.append('event[date]', event.date);
    data.append('event[event_layouts_attributes][virtual_map]', event.event_layouts_attributes.virtual_map);

    headers['X-CSRF-Token'] = document.querySelector('meta[name=\'csrf-token\']').getAttribute('content');
    Axios({
      method: 'patch',
      url: `/api/v1/events/${this.props.match.params.id}`,
      data: data,
      headers: headers })
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
        <EventForm event={this.state.prev_event} errors={this.state.errors} handleSubmit={this.handleSubmit} handleCancel={this.handleCancel} />
      </div>
    );
  }
}
