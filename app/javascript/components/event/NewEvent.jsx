import React from 'react';
import Axios from 'axios';
import EventForm from './EventForm';

export default class NewEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { event: { name: '', description: '', status: '', date: '' } };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    Axios.post('/api/v1/events', this.state.event, { headers: { 'X-CSRF-Token': csrf } })
      .then(response => this.props.history.push(`/events/${response.data.id}`))
      .catch(err => this.setState({ errors: err.response.data }))
  }

  handleCancel = () => {
    this.props.history.push("/events");
  }

  render() {
    let message;
    if (this.state.errors) {
      message = <div>
                  {this.state.errors.map((error) => {
                    return(
                      <p>{error}</p>
                    )
                  })}
                </div>
    }

    return (
      <div>
        <h1>Create</h1>
        {message}
        <EventForm event={this.state.event} handleSubmit={this.handleSubmit} handleCancel={this.handleCancel}/>
      </div>
    );
  }
}
