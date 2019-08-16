import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

export default class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { events: [] };
    this.fetchAvailableEvents = this.fetchAvailableEvents.bind(this);
  }

  fetchAvailableEvents() {
    let headers = {};
    if (sessionStorage.user) {
      headers = JSON.parse(sessionStorage.user);
    }
    const authenticationRequired = !!sessionStorage.user;
    Axios.get('/api/v1/events', {
      params: { authentication_required: authenticationRequired },
      headers: headers,
    })
      .then(response => {
        this.setState({ events: response.data });
      })
      .catch(error => console.log('error', error));
  }

  componentDidMount() {
    this.fetchAvailableEvents();
  }

  render() {
    const createEventUrl = '/events/new';
    let userRole;
    if (sessionStorage.user !== undefined) {
      userRole = JSON.parse(sessionStorage.user_attributes).role;
    }
    let createdButton;
    if (userRole == 'organizer') {
      createdButton = <Link to={createEventUrl} className="btn btn-outline-primary">Create Event</Link>;
    }

    return (
      <div>
        {createdButton}
        {this.state.events.map((event) => {
          return (
            <div key={event.id}>
              <h2><Link to={`/events/${event.id}`}>{event.name}</Link></h2>
              <p>{event.status}</p>
              <hr />
            </div>
          );
        })}
      </div>
    );
  }
}
