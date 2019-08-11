import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

export default class EventList extends React.Component {  
  constructor(props) {
    super(props);
    this.state = { events: [] };
  }

  componentDidMount() {
    Axios.get('/api/v1/events')
      .then(res => {
        this.setState({ events: res.data });
      })
      .catch(error => console.log('error', error))
  }

  render() {
    const createEventUrl = '/events/new';
    const infoEventUrl = `/events/${event.id}`;
    return (
      <div>
        <Link to={createEventUrl} className="btn btn-outline-primary">Create Event</Link>
        {this.state.events.map((event) => {
          return(
            <div key={event.id}>
              <h2><Link to={infoEventUrl}>{event.name}</Link></h2>
              <p>{event.status}</p>
              <hr/>
            </div>
          )
        })} 
      </div>
    );
  }
}
