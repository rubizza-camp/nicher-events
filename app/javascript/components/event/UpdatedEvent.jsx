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
    let headers = {};
    if (sessionStorage.user) {
      headers = JSON.parse(sessionStorage.user);
    }
    Axios.get(`/api/v1/events/${this.props.match.params.id}`, {
      headers: headers
    })
      .then(res => this.setState({ event: res.data }))
      .catch(error => console.log('error', error))
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let headers = {};
    if (sessionStorage.user) {
      headers = JSON.parse(sessionStorage.user);
    }
    headers['X-CSRF-Token'] = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    Axios.patch(`/api/v1/events/${this.props.match.params.id}`, this.state.event, { headers: headers })
      .then(() => this.props.history.push(`/events/${this.state.event.id}`))
      .catch(error => {
        switch (error.response.statusText) {
          case 'Unprocessable Entity':
            this.setState({ errors: error.response.data });
            break;
          case 'Unauthorized':
            this.setState({ errors: error.response.data.errors });
            break;
          case 'Not Found':
            this.setState({ errors: ['You can\'t do this'] });
            break;
        }
      })
  }

  handleCancel = () => {
    this.props.history.push(`/events/${this.state.event.id}`);
  }

  render() {
    return (
      <div>
        <h1>Edit</h1>
        <EventForm event={this.state.event} errors={this.state.errors} handleSubmit={this.handleSubmit} handleCancel={this.handleCancel}/>
      </div>
    );
  }
}
