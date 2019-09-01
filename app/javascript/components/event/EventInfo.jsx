import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { FormButton } from '../../ui/Buttons';
import { HomeIcon, KeyIcon } from '../../ui/IconsCollection';
import EventInvitePanel from './EventInvitePanel';
import CommentsList from '../comments/CommentsList';
import { Message } from '../../ui/Message';
import { AttendancesList } from '../../ui/AttendancesList';
import { EventCardInfo } from '../../ui/EventCardInfo';

export default class EventInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { event: {}, comments: [] };
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
    Axios.get(`/api/v1/events/${this.props.props.match.params.id}`, { headers: headers })
      .then(response => {
        this.setState({ event: response.data });
        Axios.get(`/api/v1/events/${this.props.props.match.params.id}/comments`, { headers: headers })
          .then(response => {
            this.setState({ comments: response.data });
          })
          .catch(() => this.props.history.push('/events'));
      })
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
      .then(() => { this.props.history.push('/events');})
      .catch((error) => {
        if (error.response.statusText === 'Unprocessable Entity')
          this.setState({ errors: ['This event took place'] });
      });
  }

  handleSubscribe = () => {
    let headers = {};
    if (localStorage.user) {
      headers = JSON.parse(localStorage.user);
    }
    headers['X-CSRF-Token'] = document.querySelector('meta[name=\'csrf-token\']').getAttribute('content');
    Axios.post(`/api/v1/events/${this.props.props.match.params.id}/attendances`, {}, { headers: headers })
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
    const attendanceDeleteUrl = `/api/v1/events/${this.state.event.id}/attendances/${attendanceId}`;
    Axios.delete(attendanceDeleteUrl, { headers: headers })
      .then(() => {
        this.fetchAvailableEvent();
      });
  }

  render() {
    const { event } = this.state;
    const editEventUrl = `/events/${event.id}/edit`;
    const listEventsUrl = '/events';
    const EventPanel = () => (
      <div>
        <FormButton component={Link} to={editEventUrl} text="Edit" color="primary" />
        <FormButton onClick={this.handleDelete} text="Delete" color="secondary" />
      </div>
    );
    let subscribeButton;
    if (event.attendance_id) {
      subscribeButton = <FormButton onClick={this.handleUnsubscribe} text='Unsubscribe' color="secondary" />;
    }
    else {
      subscribeButton = <FormButton onClick={this.handleSubscribe} text='Subscribe' color="primary" />;
    }
    let eventPanel;
    let invitePanel;
    if (event.available_for_edit) {
      eventPanel = <EventPanel />;
      if (event.status === 'confidential') {
        invitePanel = <div>
          <EventInvitePanel eventId={event.id} />
        </div>;
      }
    }
    let subscribePanel;
    if (!event.available_for_edit) {
      subscribePanel = subscribeButton;
    }
    let errorsMessage;
    if (this.state.errors)  {
      errorsMessage = <Message message={this.state.errors} variant='error' />;
    }

    let memberList;
    if (this.state.event.users)  {
      memberList = <div> <h2>Subscribers</h2><AttendancesList attendances={this.state.event.users} /></div>;
    }

    let commentsList;
    if (event.comments !== undefined) {
      commentsList = <CommentsList comments={this.state.comments} event_id={event.id} fetchAvailableEvent={this.fetchAvailableEvent} />;
    }
  
    return (
      <Grid container direction="row" justify="space-around" alignItems="flex-start" >
        <Grid item >
          {errorsMessage}
          <EventCardInfo key={event.id} event={event} />
          <Grid container direction="row" justify="center">
            {eventPanel}
            {subscribePanel}
            <FormButton component={Link} to={listEventsUrl} text='Cancel' />
          </Grid>
          {invitePanel}
          <Grid container direction="column" justify="center" alignItems="center">
            {memberList}
          </Grid>
        </Grid>
        <Grid item>
          {commentsList}
        </Grid>
      </Grid>
    );
  }
}
