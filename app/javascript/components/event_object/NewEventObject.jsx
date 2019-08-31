import React from 'react';
import Axios from 'axios';
import EventObjectForm from './EventObjectForm';

export default class NewEventObject extends React.Component {
  constructor(props) {
    super(props);
    this.state = { eventObject: {name: '', description: '', file: '', location: '' } };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    let userRole;
    if (localStorage.user !== undefined) {
      userRole = JSON.parse(localStorage.user_attributes).role;
    }
    if (userRole !== 'organizer') {
      this.props.history.push('/event_objects');
    }
  }

  handleSubmit = (e, eventObject) => {
    e.preventDefault();
    let headers = {};
    if (localStorage.user) {
      headers = JSON.parse(localStorage.user);
    }
    const data = new FormData();
    data.append('name', eventObject.name);
    data.append('description', eventObject.description);
    data.append('file', eventObject.file);
    headers['X-CSRF-Token'] = document.querySelector('meta[name=\'csrf-token\']').getAttribute('content');
    Axios.post('/api/v1/event_objects', data, { headers: headers })
    .then(() => this.props.history.push(`/event_objects`))
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
        <EventObjectForm eventObject={this.state.eventObject} errors={this.state.errors} handleSubmit={this.handleSubmit} handleCancel={this.handleCancel} />
      </div>
    );
  }
}
