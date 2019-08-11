import React, { Component } from 'react';
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
      .then(res => {
        this.setState({ event: res.data });
      })
      .catch(error => console.log('error', error))
  }

  handleDelete() {
    Axios.delete(`/api/v1/events/${this.props.match.params.id}`)
      .then(() => {
        this.props.history.push("/events")
      })
      .catch(error => console.log('error', error))
  }

  render() {
    const eventInfo = <p>id: {this.state.event.id} - {this.state.event.status}</p>;
    const editEventUrl = `/events/${this.state.event.id}/edit`;
    const listEventsUrl = '/events';
    return (
      <div>
        <h2>{this.state.event.name}</h2>
        <p>Info: {eventInfo}</p>
        <p>Date: {this.state.event.date}</p>
        <p>Description: {this.state.event.description}</p>
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
