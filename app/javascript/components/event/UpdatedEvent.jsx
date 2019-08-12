import React from 'react';
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
    const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    Axios.patch(`/api/v1/events/${this.props.match.params.id}`, this.state.event, 
                { headers: { 'X-CSRF-Token': csrf } })
      .then(data => this.props.history.push(`/events/${this.state.event.id}`))
      .catch(err => this.setState({ errors: err.response.data }))
  }

  handleCancel = () => {
    this.props.history.push(`/events/${this.state.event.id}`);
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
        <h1>Edit</h1>
        {message}
        <EventForm event={this.state.event} handleSubmit={this.handleSubmit} handleCancel={this.handleCancel}/>
      </div>
    );
  }
}
