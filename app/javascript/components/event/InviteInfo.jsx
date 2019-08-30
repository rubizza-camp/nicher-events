import React from 'react';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { FormButton } from '../../ui/Buttons';
const queryString = require('query-string');

export default class InviteInfo extends React.Component {
  constructor(props) {
    super(props);
    const parsed = queryString.parse(this.props.location.search);
    this.state = { invite: { id: '', event: {}, token: parsed.token }};
    this.fetchAvailableEvent = this.fetchAvailableEvent.bind(this);
    this.handleAccess = this.handleAccess.bind(this);
    this.handleReject = this.handleReject.bind(this);
  }

  fetchAvailableEvent() {
    let headers = {};
    if (localStorage.user) {
      headers = JSON.parse(localStorage.user);
    }
    const params = this.props.match.params;
    const inviteShowUrl = `/api/v1/events/${params.event_id}/event_invites/${params.id}`;
    const inviteUrl = `events/${params.event_id}/event_invites/${params.id}`;
    Axios.get(inviteShowUrl, { params: { token: this.state.invite.token }, headers: headers })
      .then(response => { this.setState({ invite: response.data });})
      .catch(error => {
        if (error.response.statusText === 'Unauthorized')
          this.props.history.push(`/sign_in?redirect_url=${inviteUrl}&token=${this.state.invite.token}`);
      });
  }

  componentDidMount() {
    this.fetchAvailableEvent();
  }

  handleAccess = () => {
    let headers = {};
    if (localStorage.user) {
      headers = JSON.parse(localStorage.user);
    }
    headers['X-CSRF-Token'] = document.querySelector('meta[name=\'csrf-token\']').getAttribute('content');
    const params = this.props.match.params;
    const inviteRejectUrl = `/api/v1/events/${params.event_id}/event_invites/${params.id}`;
    const parsed = queryString.parse(this.props.location.search);
    Axios.patch(inviteRejectUrl, { status: 'access', token: parsed.token }, { headers: headers })
      .then(() => {
        Axios.post(`/api/v1/events/${this.props.match.params.event_id}/attendances`, { }, { headers: headers })
          .then(() => {
            const eventInfoUrl = `/events/${this.state.invite.event.id}`;
            this.props.history.push(eventInfoUrl);
          });
      })
      .catch(error => {
        if (error.response.statusText === 'Unauthorized')
          this.props.history.push('/sign_in');
      });
  }

  handleReject = () => {
    let headers = {};
    if (localStorage.user) {
      headers = JSON.parse(localStorage.user);
    }
    headers['X-CSRF-Token'] = document.querySelector('meta[name=\'csrf-token\']').getAttribute('content');
    const params = this.props.match.params;
    const inviteRejectUrl = `/api/v1/events/${params.event_id}/event_invites/${params.id}`;
    const parsed = queryString.parse(this.props.location.search);
    Axios.patch(inviteRejectUrl, { status: 'reject', token: parsed.token }, { headers: headers })
      .then(() => this.props.history.push('/events'));
  }

  render() {
    const { event } = this.state.invite;
    const eventInfo =  `${event.id} - ${event.status}`;

    return (
      <Grid container direction="column" justify="center" alignItems="center">
        <p>InviteInfo.jsx</p>
        <h2>{event.name}</h2>
        <p>Info: {eventInfo}</p>
        <p>Date: {event.date}</p>
        <p>Description: {event.description}</p>
        <Grid container direction="row" justify="center">
          <FormButton onClick={this.handleAccess} text='Access' color="primary" />
          <FormButton onClick={this.handleReject} text='Reject' color="secondary" />
        </Grid>
        <hr/>
      </Grid>
    );
  }
}
