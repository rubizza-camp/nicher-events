import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

export default class EventList extends React.Component {  
  constructor(props) {
    super(props);
    this.state = { events: [] };
  }

  componentDidMount() {
    if(sessionStorage.user != null) {
      // const header = JSON.parse(sessionStorage.user)
      // Axios.defaults.headers.common['access-token'] = header['access-token']
      // Axios.defaults.headers.common['client'] = header['client']
      // Axios.defaults.headers.common['uid'] = header['uid']
    Axios.get('api/v1/events')
      .then(res => {  debugger;
        this.setState({ events: res.data });
      })
      .catch(error => console.log('error', error))}
  }

  render() {
    return (
      <div>
        {this.state.events.map((event) => {
          return(
            <div key={event.id}>
              <h2><Link to={`/events/${event.id}`}>{event.name}</Link> - {event.status}</h2>
              <hr/>
            </div>
          )
        })}
        <Link to="/events/new" className="btn btn-outline-primary">Create Event</Link> 
      </div>
    );
  }
}
