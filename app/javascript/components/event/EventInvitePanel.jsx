import React from 'react';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { FormButton } from '../../ui/Buttons';
import { FormTextField } from '../../ui/FormTextField';
import { Message } from '../../ui/Message';

export default class EventInvitePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { invite: { email: '', eventId: '' } };
    this.handleChange = this.handleChange.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }

  handleChange = (invite) => {
    var prevState = {...this.state};
    var updatedEvent = {...this.state.invite};
    updatedEvent[invite.target.name] = invite.target.value;
    this.setState({ ...prevState, invite: updatedEvent });
  }

  handleSend = (e) => {
    e.preventDefault();
    let headers = {};
    if (localStorage.user) {
      headers = JSON.parse(localStorage.user);
    }
    headers['X-CSRF-Token'] = document.querySelector('meta[name=\'csrf-token\']').getAttribute('content');
    const createInviteUrl = `/api/v1/events/${this.props.eventId}/event_invites`;
    Axios.post(createInviteUrl, { event_invite: { email: this.state.invite.email } }, { headers: headers })
      .then(() => {
        this.setState({ response: ['An email has been sent'] });
      })
      .catch(error => {
        if ( error.response.statusText === 'Unprocessable Entity') {
          this.setState({ errors: ['User has already subcribed on this event'] });
        }}
      );
  }

  render () {
    const { invite } = this.state;
    let message;
    if (this.state.errors)  {
      message = <Message message={this.state.errors} variant='error' />;
    }
    if (this.state.response)  {
      message = <Message message={this.state.response} variant='success' />;
    }
    return (
      <Grid container direction="column" justify="center" alignItems="center">
        {message}
        <h2>Send invitation link</h2>
        <FormTextField
          value={invite.email}
          name="email" 
          label="Email"
          onChange={this.handleChange}
        />
        <FormButton text='Send' color="primary" onClick={this.handleSend} />
      </Grid>
    );
  }
}
