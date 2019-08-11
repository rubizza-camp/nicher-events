import React, { Component } from 'react';
import Axios from 'axios';
import EventForm from './EventForm';

export default class UpdatedEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { event: {name: '', description: '', status: '', date: ''} };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    Axios.get(`/api/v1/events/${this.props.match.params.id}`)
      .then(res => this.setState({ event: res.data }))
      .catch(error => console.log('error', error))
  }

  handleSubmit = (event) => {
    event.preventDefault();
    Axios.patch(`/api/v1/events/${this.props.match.params.id}`, this.state.event)
      .then(data => this.props.history.push(`/events/${this.state.event.id}`))
      .catch(error => console.log('error', error));
  }

  handleCancel = () => {
    this.props.history.push(`/events/${this.state.event.id}`);
  }

  render() {
    return (
      <div>
        <h1>Edit</h1>
        <EventForm event={this.state.event} handleSubmit={this.handleSubmit} handleCancel={this.handleCancel}/>
      </div>
    );
  }
}
