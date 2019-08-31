import React from 'react';
import Axios from 'axios';
import EventObjectForm from './EventObjectForm';

export default class EditEventObject extends React.Component {
  constructor(props) {
    super(props);
    this.state = { eventObject: {name: '', description: '', file: '', location: ''} };
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
      this.props.history.push('/event_objects');
    }
  }

  componentDidMount() {
    this.handleRedirect();
    let headers = {};
    if (localStorage.user) {
      headers = JSON.parse(localStorage.user);
    }
    Axios.get(`/api/v1/event_objects/${this.props.match.params.id}`, {
      headers: headers
    })
    .then(res => this.setState({ eventObject: res.data }));
  }

  handleSubmit = (e, eventObjects) => {
    e.preventDefault();
    let headers = {};
    if (localStorage.user) {
      headers = JSON.parse(localStorage.user);
    }
    const data = new FormData();
    data.append('name', eventObjects.name);
    data.append('description', eventObjects.description);
    data.append('file', eventObjects.file);
    headers['X-CSRF-Token'] = document.querySelector('meta[name=\'csrf-token\']').getAttribute('content');
    Axios.patch(`/api/v1/event_objects/${this.props.match.params.id}`, data, { headers: headers })
    .then(() => this.props.history.push(`/event_objects/${this.state.eventObject.id}`))
    .catch(error => {
      debugger;
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
    this.props.history.push(`/event_objects/${this.state.eventObject.id}`);
  }

  render() {
    return (
      <div>
        <EventObjectForm eventObject={this.state.eventObject} errors={this.state.errors} handleSubmit={this.handleSubmit} handleCancel={this.handleCancel} />
      </div>
    );
  }
}
