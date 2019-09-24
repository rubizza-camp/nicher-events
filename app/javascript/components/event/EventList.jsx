import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { FormButton } from '../../ui/Buttons';
import { EventCard } from '../../ui/EventCard';

export default class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { events: [] };
    this.fetchAvailableEvents = this.fetchAvailableEvents.bind(this);
  }

  fetchAvailableEvents() {
    let headers = {};
    if (localStorage.user) {
      headers = JSON.parse(localStorage.user);
    }
    Axios.get('/api/v1/events', { headers: headers })
      .then((response) => {
        this.setState({ events: response.data });
      });
  }

  componentDidMount() {
    this.fetchAvailableEvents();
  }

  render() {
    const createEventUrl = '/events/new';
    let userRole;
    if (localStorage.user !== undefined) {
      userRole = JSON.parse(localStorage.user_attributes).role;
    }

    let createdButton;
    if (userRole == 'organizer') {
      createdButton =  <FormButton component={Link} to={createEventUrl} color="primary" text='Create Event' />;
    }

    return (
      <div>
        {createdButton}
        <Grid container direction="row" justify="center" alignItems="center">
          {this.state.events.map(event => ( <EventCard key={event.id} event={event} /> ))}
        </Grid>
      </div>
    );
  }
}
