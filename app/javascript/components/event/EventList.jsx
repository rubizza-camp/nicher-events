import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

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
      .then(response => {
        this.setState({ events: response.data });
      })
      .catch(error => console.log('error', error));
  }

  componentDidMount() {
    this.fetchAvailableEvents();
  }

  render() {
    const useStyles = makeStyles(theme => ({
      root: {
        width: '98%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',

      },
      table: {
        minWidth: 650,
      },
      button: {
        margin: theme.spacing(1),
        width: 165,
      },
    }));

    const createEventUrl = '/events/new';
    let userRole;
    if (sessionStorage.user !== undefined) {
      userRole = JSON.parse(sessionStorage.user_attributes).role;
    }
    const CreatedButton = () => {
      const classes = useStyles();
      return <Button component={Link} to={createEventUrl} type="submit" variant="contained" color="primary" className={classes.button}>Create Event</Button>;
    }
    let createdButton;
    if (userRole == 'organizer') {
      createdButton = <CreatedButton />;
    }

const TableEvent = () => {
    const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead  className={classes.head}>
          <TableRow>
            <TableCell><h3>Name</h3></TableCell>
            <TableCell align="right"><h3>Date and time</h3></TableCell>
            <TableCell align="right"><h3>Status</h3></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.events.map(event => (
            <TableRow key={event.name}>
              <TableCell component="th" scope="row">
                <h2><Link to={`/events/${event.id}`}>{event.name}</Link></h2>
              </TableCell>
              <TableCell align="right"><h3>{event.date}</h3></TableCell>
              <TableCell align="right"><h3>{event.status}</h3></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );}

  
    return (
      <div>
        {createdButton}
        <Grid container direction="column" justify="center" alignItems="center">
          <TableEvent />
        </Grid>
      </div>
    );
  }
}
