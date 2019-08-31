import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { FormButton } from '../../ui/Buttons';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

export default class EventObjectList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { eventObjects: [] };
    this.fetchAvailableEvents = this.fetchAvailableEvents.bind(this);
  }

  fetchAvailableEvents() {
    let headers = {};
    if (localStorage.user) {
      headers = JSON.parse(localStorage.user);
    }
    Axios.get('/api/v1/event_objects', { headers: headers })
    .then((response) => {
      this.setState({ eventObjects: response.data });
    });
  }

  componentDidMount() {
    this.fetchAvailableEvents();
  }

  render() {
    const createEventUrl = '/event_objects/new';
    let userRole;
    if (localStorage.user !== undefined) {
      userRole = JSON.parse(localStorage.user_attributes).role;
    }

    let createdButton;
    if (userRole === 'organizer') {
      createdButton =  <FormButton component={Link} to={createEventUrl} color="primary" text='Create Event Object' />;
    }
    const EventObjectsList = () => {
      return (
        <List button>
              {this.state.eventObjects.map(eventObjects => (
                <ListItem key={eventObjects.id}>
                  <div>
                  <p><Link to={`/event_objects/${eventObjects.id}`}>{eventObjects.name}</Link></p>
                  <img srcSet={eventObjects.location}
                       className="Avatar"
                       alt="avatar"
                  />
                  </div>
                </ListItem>
              ))}
        </List>
      );
    }
    return (
      <div>
        {createdButton}
        <EventObjectsList />
      </div>
    );
  }
}
