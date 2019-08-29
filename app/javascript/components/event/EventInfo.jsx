import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { FormButton } from '../../ui/Buttons';
import { HomeIcon, KeyIcon } from '../../ui/IconsCollection';
import EventInvitePanel from './EventInvitePanel';
import CommentsList from '../comments/CommentsList';

export default class EventInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { event: {} };
    this.handleDelete = this.handleDelete.bind(this);
    this.fetchAvailableEvent = this.fetchAvailableEvent.bind(this);
    this.handleSubscribe = this.handleSubscribe.bind(this);
    this.handleUnsubscribe = this.handleUnsubscribe.bind(this);
  }

  fetchAvailableEvent() {
    let headers = {};
    if (localStorage.user) {
      headers = JSON.parse(localStorage.user);
    }
    Axios.get(`/api/v1/events/${this.props.match.params.id}`, { headers: headers })
      .then(response => this.setState({ event: response.data }))
      .catch(() => this.props.history.push('/events'));
  }

  componentDidMount() {
    this.fetchAvailableEvent();
  }

  handleDelete() {
    let headers = {};
    if (localStorage.user) {
      headers = JSON.parse(localStorage.user);
    }
    headers['X-CSRF-Token'] = document.querySelector('meta[name=\'csrf-token\']').getAttribute('content');
    Axios.delete(`/api/v1/events/${this.props.match.params.id}`, { headers: headers })
      .then(() => {
        this.props.history.push('/events');
      });
  }

  handleSubscribe = () => {
    let headers = {};
    if (localStorage.user) {
      headers = JSON.parse(localStorage.user);
    }
    headers['X-CSRF-Token'] = document.querySelector('meta[name=\'csrf-token\']').getAttribute('content');
    Axios.post(`/api/v1/events/${this.props.match.params.id}/attendances`, {}, { headers: headers })
      .then(() => {
        this.fetchAvailableEvent();
      })
      .catch(error => {
        if (error.response.statusText === 'Unauthorized')
          this.props.history.push('/sign_in');
      });
  }

  handleUnsubscribe = () => {
    let headers = {};
    if (localStorage.user) {
      headers = JSON.parse(localStorage.user);
    }
    headers['X-CSRF-Token'] = document.querySelector('meta[name=\'csrf-token\']').getAttribute('content');
    const attendanceId = this.state.event.attendance_id;
    const attendanceDeleteUrl = `/api/v1/events/${this.props.match.params.id}/attendances/${attendanceId}`;
    Axios.delete(attendanceDeleteUrl, { headers: headers })
      .then(() => {
        this.fetchAvailableEvent();
      });
  }

  render() {
    const { event } = this.state;
    const editEventUrl = `/events/${event.id}/edit`;
    const listEventsUrl = '/events';
    const eventInfo =  `${event.id} - ${event.status}`;
    const EventPanel = () => (
      <div>
        <FormButton component={Link} to={editEventUrl} text="Edit" color="primary" />
        <FormButton onClick={this.handleDelete} text="Delete" color="secondary" />
      </div>
    );
    let subscribeButton;
    if (event.attendance_id !== null) {
      subscribeButton = <FormButton onClick={this.handleUnsubscribe} text='Unsubscribe' color="secondary" />;
    }
    else {
      subscribeButton = <FormButton onClick={this.handleSubscribe} text='Subscribe' color="primary" />;
    }
    let eventPanel;
    let homeIcon;
    let invitePanel;
    if (event.available_for_edit) {
      eventPanel = <EventPanel />;
      homeIcon = <HomeIcon />;
      if (event.status === 'confidential') {
        invitePanel = <EventInvitePanel eventId={event.id} />;
      }
    }
    let keyIcon;
    if (event.status === 'confidential') {
      keyIcon = <KeyIcon />;
    }
    let subscribePanel;
    if (!event.available_for_edit) {
      subscribePanel = subscribeButton;
    }
    let errorsMessage;
    if (this.state.errors)  {
      errorsMessage = <div>
        {this.state.errors.map((error) => (
          <p key={error.id}>{error}</p>
        ))}
      </div>;
    }
    let memberList;
    if (this.state.event.users)  {
      memberList = <ul>
        {this.state.event.users.map((user) => (
          <li key={user.id}>{user.first_name}</li>
        ))}
      </ul>;
    }

    let comments_temp;
    if (event.comments !== undefined) {
      comments_temp = <CommentsList comments={event.comments} event_id={event.id} fetchAvailableEvent={this.fetchAvailableEvent} />;
    }
  
    return (
      <Grid container direction="column" justify="center" alignItems="center">
        {errorsMessage}
        {memberList}
        {invitePanel}
        <h2>{event.name}</h2>
        <Grid container direction="row" justify="center">
          {homeIcon}
          {keyIcon}
        </Grid>
        <p>Info: {eventInfo}</p>
        <p>Date: {event.date}</p>
        <p>Description: {event.description}</p>
        <Grid container direction="row" justify="center">
          {eventPanel}
          {subscribePanel}
          <FormButton component={Link} to={listEventsUrl} text='Cancel' />
        </Grid>
        <hr/>
        {comments_temp}
      </Grid>
    );
  }
}
