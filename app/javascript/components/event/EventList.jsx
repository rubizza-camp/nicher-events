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
    const isUserAuthenticate = !!sessionStorage.user;
    Axios.get('/api/v1/events', {
      params: { is_user_authenticate: isUserAuthenticate },
      headers: headers,
    })
      .then(res => {
        this.setState({ events: res.data });
      })
      .catch(error => console.log('error', error));
  }

  componentDidMount() {
    this.fetchAvailableEvents();
  }

  render() {
    const createEventUrl = '/events/new';
    let createdButton;
    if (sessionStorage.user != null) {
      createdButton = <Link to={createEventUrl} className="btn btn-outline-primary">Create Event</Link>;
    }

    return (
      <div>
        {createdButton}
        {this.state.events.map((event) => {
          return(
            <div key={event.id}>
              <h2><Link to={`/events/${event.id}`}>{event.name}</Link></h2>
              <p>{event.status}</p>
              <hr/>
            </div>
          );
        })} 
      </div>
    );
  }
}
