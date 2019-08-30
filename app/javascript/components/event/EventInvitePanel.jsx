import React from 'react';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { FormButton } from '../../ui/Buttons';
import { FormTextField } from '../../ui/FormTextField';

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
      .catch(error => {
        if ( error.response.statusText === 'Unprocessable Entity') {
          this.setState({ errors: error.response.data.error });
        }}
      );
  }

  render () {
    const { invite } = this.state;
    return (
      <Grid container direction="column" justify="center" alignItems="center">
        {this.state.errors}
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
