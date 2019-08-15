import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

export default class EventInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { event: {} };
    this.handleDelete = this.handleDelete.bind(this);
    this.fetchAvailableEvent = this.fetchAvailableEvent.bind(this);
  }

  fetchAvailableEvent() {
    let headers = {};
    if (sessionStorage.user) {
      headers = JSON.parse(sessionStorage.user);
    }
    const isUserAuthenticate = !!sessionStorage.user;
    Axios.get(`/api/v1/events/${this.props.match.params.id}`, {
      params: { is_user_authenticate: isUserAuthenticate },
      headers: headers,
    })
      .then(response => this.setState({ event: response.data }))
      .catch(() => this.props.history.push('/events'))
  }

  componentDidMount() {
    this.fetchAvailableEvent();
  }

  handleDelete() {
    let headers = {};
    if (sessionStorage.user) {
      headers = JSON.parse(sessionStorage.user);
    }
    headers['X-CSRF-Token'] = document.querySelector("meta[name='csrf-token']").getAttribute('content');
    Axios.delete(`/api/v1/events/${this.props.match.params.id}`, { headers: headers })
      .then(() => {
        this.props.history.push('/events');
      })
      .catch(error => {
        if (error.response.statusText == 'Not Found')
          this.setState({ errors: ['You can\'t do this'] });
      });
  }

  render() {
    const { event } = this.state;
    const editEventUrl = `/events/${event.id}/edit`;
    const listEventsUrl = '/events';
    const EventInfo = () => (
      <p>Info: id: {event.id} - {event.status}</p>
    );
    const EventPanel = () => (
      <div>
        <p><Link to={editEventUrl} className="btn btn-outline-dark">Edit</Link></p> 
        <button onClick={this.handleDelete} className="btn btn-outline-dark">Delete</button>
      </div>
    );

    let userRole;
    if (sessionStorage.user !== undefined) {
      userRole = JSON.parse(sessionStorage.user_attributes).role;
    }

    let eventPanel;
    if (userRole == 'organizer') {
      eventPanel = <EventPanel />;
    }

    let errorsMessage;
    if (this.state.errors)  {
      errorsMessage = <div>
        {this.state.errors.map((error) => {
          return(
            <p>{error}</p>
          );
        })}
      </div>;
    }

    return (
      <div>
        {errorsMessage}
        <h2>{event.name}</h2>
        <EventInfo />
        <p>Date: {event.date}</p>
        <p>Description: {event.description}</p>
        {eventPanel}
        <p>
          <Link to={listEventsUrl} className="btn btn-outline-dark">Close</Link>
        </p>
        <hr/>
      </div>
    );
  }
}
