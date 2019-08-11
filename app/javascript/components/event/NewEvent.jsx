import React, { Component } from 'react';
import Axios from 'axios';
import EventForm from './EventForm';

export default class NewEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { event: {name: '', description: '', status: '', date: ''} };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    Axios.post('/api/v1/events', this.state.event)
      .then(response => this.props.history.push(`/events/${response.data.id}`))
      .catch(error => console.log('error', error))
  }

  handleCancel = () => {
    this.props.history.push("/events");
  }

  render() {
    return (
      <div>
        <h1>Create</h1>
        <EventForm event={this.state.event} handleSubmit={this.handleSubmit} handleCancel={this.handleCancel}/>
      </div>
    );
  }
}
