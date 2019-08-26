import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { FormButton } from '../../ui/Buttons';
import { HomeIcon, KeyIcon } from '../../ui/IconsCollection';
import { CommentCard } from '../../ui/CommentCard';
import CommentForm from '../comments/CommentForm';
import CommentDelete from '../comments/CommentDelete';
import CommentUpdate from '../comments/CommentUpdate';

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

  handleSubscribe = () => {
    let headers = {};
    if (sessionStorage.user) {
      headers = JSON.parse(sessionStorage.user);
    }
    headers['X-CSRF-Token'] = document.querySelector('meta[name=\'csrf-token\']').getAttribute('content');
    Axios.post(`/api/v1/events/${this.props.match.params.id}/attendances`, {}, { headers: headers })
      .then(() => {
        this.fetchAvailableEvent();
      });
  }

  handleUnsubscribe = () => {
    let headers = {};
    if (sessionStorage.user) {
      headers = JSON.parse(sessionStorage.user);
    }
    headers['X-CSRF-Token'] = document.querySelector('meta[name=\'csrf-token\']').getAttribute('content');
    const attendance_id = this.state.event.attendance_id;
    const attendanceDeleteUrl = `/api/v1/events/${this.props.match.params.id}/attendances/${attendance_id}`;
    Axios.delete(attendanceDeleteUrl, { headers: headers })
      .then(() => {
        this.fetchAvailableEvent();
      });
  }

  render() {
    debugger
    const { event } = this.state;
    debugger
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
    if (event.available_to_edit) {
      eventPanel = <EventPanel />;
      homeIcon = <HomeIcon />;
    }
    let keyIcon;
    if (event.status === 'confidential') {
      keyIcon = <KeyIcon />;
    }
    let subscribePanel;
    if (event.available_to_subscribed) {
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

    let commentForm
    if (sessionStorage.user !== undefined) {
      commentForm = <CommentForm comment={this.state.comment} errors={this.state.errors} handleSubmit={this.handleSubmit} />
    }
  
    return (
      <Grid container direction="column" justify="center" alignItems="center">
        {errorsMessage}
        {memberList}
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
      </Grid>
    );
  }
}
