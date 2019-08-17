import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export default class EventInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { event: {} };
    this.handleDelete = this.handleDelete.bind(this);
    this.fetchAvailableEvent = this.fetchAvailableEvent.bind(this);
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
      .catch(() => this.props.history.push('/events'))
  }

  componentDidMount() {
    this.fetchAvailableEvent();
  }

  handleDelete() {
    let headers = {};
    if (sessionStorage.user) {
      headers = JSON.parse(sessionStorage.user);
    }
    headers['X-CSRF-Token'] = document.querySelector("meta[name='csrf-token']").getAttribute('content');
    Axios.delete(`/api/v1/events/${this.props.match.params.id}`, { headers: headers })
      .then(() => {
        this.props.history.push('/events');
      })
      .catch(error => {
        if (error.response.statusText === 'Not Found')
          this.setState({ errors: ['You can\'t do this'] });
      });
  }

  render() {
    const useStyles = makeStyles(theme => ({
      button: {
        margin: theme.spacing(1),
        width: 165,
      },
    }));
    const { event } = this.state;
    const editEventUrl = `/events/${event.id}/edit`;
    const listEventsUrl = '/events';
    const SaveButton = () => {
      const classes = useStyles();
      return <Button component={Link} to={editEventUrl}  type="submit" variant="contained" color="primary" className={classes.button}>Edit</Button>;
    }
    const DeleteButton = () => {
      const classes = useStyles();
      return <Button onClick={this.handleDelete} variant="contained" color="secondary" className={classes.button}>Delete</Button>;
    }
    const CancelButton = () => {
      const classes = useStyles();
      return <Button component={Link} to={listEventsUrl} onClick={this.handleDelete} variant="contained" className={classes.button}>Cancel</Button>;
    }
    const eventInfo =  `${event.id} - ${event.status}`;
    const EventPanel = () => (
      <div>
        <SaveButton />
        <DeleteButton />
      </div>
    );

    let userRole;
    if (sessionStorage.user !== undefined) {
      userRole = JSON.parse(sessionStorage.user_attributes).role;
    }

    let eventPanel;
    if (userRole == 'organizer') {
      eventPanel = <EventPanel />;
    }

    let errorsMessage;
    if (this.state.errors)  {
      errorsMessage = <div>
        {this.state.errors.map((error, index) => {
          return(
            <p key={index}>{error}</p>
          );
        })}
      </div>;
    }

    return (
      <Grid container direction="column" justify="center" alignItems="center">
        {errorsMessage}
        <h2>{event.name}</h2>
        <p>Info: {eventInfo}</p>
        <p>Date: {event.date}</p>
        <p>Description: {event.description}</p>
        <Grid container direction="row" justify="center">
          {eventPanel}
          <CancelButton />
        </Grid>
        <hr/>
      </Grid>
    );
  }
}
