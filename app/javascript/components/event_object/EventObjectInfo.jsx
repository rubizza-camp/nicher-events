import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { FormButton } from '../../ui/Buttons';

export default class EventInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { eventObject: {} };
    this.handleDelete = this.handleDelete.bind(this);
    this.fetchAvailableEvent = this.fetchAvailableEvent.bind(this);
  }

  fetchAvailableEvent() {
    let headers = {};
    if (localStorage.user) {
      headers = JSON.parse(localStorage.user);
    }
    Axios.get(`/api/v1/event_objects/${this.props.match.params.id}`, { headers: headers })
    .then(response => this.setState({ eventObject: response.data }))
    .catch(() => this.props.history.push('/event_objects'));
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
    Axios.delete(`/api/v1/event_objects/${this.props.match.params.id}`, { headers: headers })
    .then(() => {
      this.props.history.push('/event_objects');
    });
  }

  render() {
    const { eventObject } = this.state;
    const editEventObjectUrl = `/event_objects/${eventObject.id}/edit`;
    const listEventObjectsUrl = '/event_objects';


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
        <h2>{eventObject.name}</h2>
        <p>Description: {eventObject.description}</p>
        <Grid container direction="row" justify="center">
          <div>
            <FormButton component={Link} to={editEventObjectUrl} text="Edit" color="primary" />
            <FormButton onClick={this.handleDelete} text="Delete" color="secondary" />
          </div>
          <FormButton component={Link} to={listEventObjectsUrl} text='Cancel' />
        </Grid>
        <hr/>
      </Grid>
    );
  }
}
