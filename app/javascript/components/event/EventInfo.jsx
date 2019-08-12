import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

export default class EventInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { event: {} };
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    Axios.get(`/api/v1/events/${this.props.match.params.id}`)
      .then(res => this.setState({ event: res.data }))
      .catch(error => console.log('error', error))
  }

  handleDelete() {
    const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    Axios.delete(`/api/v1/events/${this.props.match.params.id}`, { headers: { 'X-CSRF-Token': csrf } })
      .then(() => {
        this.props.history.push("/events")
      })
      .catch(error => console.log('error', error))
  }

  render() {
    const { event } = this.state;
    const eventInfo = <p>Info: id: {event.id} - {event.status}</p>;
    const editEventUrl = `/events/${event.id}/edit`;
    const listEventsUrl = '/events';
    return (
      <div>
        <h2>{event.name}</h2>
        <p>{eventInfo}</p>
        <p>Date: {event.date}</p>
        <p>Description: {event.description}</p>
        <p>
          <Link to={editEventUrl} className="btn btn-outline-dark">Edit</Link> 
        </p> 
          <button onClick={this.handleDelete} className="btn btn-outline-dark">Delete</button> 
        <p>
          <Link to={listEventsUrl} className="btn btn-outline-dark">Close</Link>
        </p>
        <hr/>
      </div>
    )
  }
}
