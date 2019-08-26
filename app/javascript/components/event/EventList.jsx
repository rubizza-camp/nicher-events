import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { FormButton } from '../../ui/Buttons';
import { EventsList } from '../../ui/EventsList';

export default class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { events: [] };
    this.fetchAvailableEvents = this.fetchAvailableEvents.bind(this);
  }

  fetchAvailableEvents() {
    let headers = {};
    if (sessionStorage.user) {
      headers = JSON.parse(sessionStorage.user);
    }
    const authenticationRequired = !!sessionStorage.user;
    Axios.get('/api/v1/events', {
      params: { authentication_required: authenticationRequired },
      headers: headers,
    })
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
    if (sessionStorage.user !== undefined) {
      userRole = JSON.parse(sessionStorage.user_attributes).role;
    }

    let createdButton;
    if (userRole == 'organizer') {
      createdButton =  <FormButton component={Link} to={createEventUrl} color="primary" text='Create Event'/>;
    }

    return (
      <div>
        {createdButton}
        <Grid container direction="column" justify="center" alignItems="center">
          <EventsList events={this.state.events} />
        </Grid>
      </div>
    );
  }
}
