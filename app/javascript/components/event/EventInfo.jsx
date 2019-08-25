import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { FormButton } from '../../ui/Buttons';

export default class EventInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { event: {} };
    this.handleDelete = this.handleDelete.bind(this);
    this.fetchAvailableEvent = this.fetchAvailableEvent.bind(this);
  }

  fetchAvailableEvent() {
    let headers = {};
    if (sessionStorage.user) {
      headers = JSON.parse(sessionStorage.user);
    }
    const authenticationRequired = !!sessionStorage.user;
    Axios.get(`/api/v1/events/${this.props.match.params.id}`, {
      params: { authentication_required: authenticationRequired },
      headers: headers,
    })
      .then(response => this.setState({ event: response.data }))
      .catch(() => this.props.history.push('/events'));
  }

  componentDidMount() {
    this.fetchAvailableEvent();
  }

  handleDelete() {
    let headers = {};
    if (sessionStorage.user) {
      headers = JSON.parse(sessionStorage.user);
    }
    headers['X-CSRF-Token'] = document.querySelector('meta[name=\'csrf-token\']').getAttribute('content');
    Axios.delete(`/api/v1/events/${this.props.match.params.id}`, { headers: headers })
      .then(() => {
        this.props.history.push('/events');
      })
      .catch(error => {
        if (error.response.statusText === 'Not Found')
          this.setState({ errors: ['You can\'t do this'] });
      });
  }

  render() {
    const { event } = this.state;
    const editEventUrl = `/events/${event.id}/edit`;
    const listEventsUrl = '/events';
    const eventInfo =  `${event.id} - ${event.status}`;
    const EventPanel = () => (
      <div>
        <FormButton component={Link} to={editEventUrl} color="primary" text="Edit" />
        <FormButton color="secondary" onClick={this.handleDelete} text="Delete" />
      </div>
    );

    let eventPanel;
    if (event.available_to_edit) {
      eventPanel = <EventPanel />;
    }

    let errorsMessage;
    if (this.state.errors)  {
      errorsMessage = <div>
        {this.state.errors.map((error) => (
          <p key={error.id}>{error}</p>
        ))}
      </div>;
    }

    return (
      <Grid container direction="column" justify="center" alignItems="center">
        {errorsMessage}
        <h2>{event.name}</h2>
        <p>Info: {eventInfo}</p>
        <p>Date: {event.date}</p>
        <p>Description: {event.description}</p>
        <Grid container direction="row" justify="center">
          {eventPanel}
          <FormButton component={Link} to={listEventsUrl} text='Cancel' />
        </Grid>
        <hr/>
      </Grid>
    );
  }
}
