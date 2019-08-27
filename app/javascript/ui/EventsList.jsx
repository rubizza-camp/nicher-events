import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import { HomeIcon, KeyIcon } from './IconsCollection';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    width: '98%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  }, 
}));

export const EventsList = (params) => {
  const classes = useStyles();
  function IconPanel(props) {
    let keyIcon;
    if (props.event.status === 'confidential') {
      keyIcon = <KeyIcon />;
    }
    let homeIcon;
    if (props.event.available_to_edit) {
      homeIcon = <HomeIcon />;
    }
    return (
      <Grid container direction="row">
        {keyIcon}
        {homeIcon}
      </Grid>
    );}

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead  className={classes.head}>
          <TableRow>
            <TableCell><h3>Name</h3></TableCell>
            <TableCell></TableCell>
            <TableCell align="right"><h3>Date and time</h3></TableCell>
            <TableCell align="right"><h3>Status</h3></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {params.events.map(event => (
            <TableRow key={event.name}>
              <TableCell component="th" scope="row">
                <h2><Link to={`/events/${event.id}`}>{event.name}</Link></h2>
              </TableCell>
              <TableCell><IconPanel event={event} /></TableCell>
              <TableCell align="right"><h3>{event.date}</h3></TableCell>
              <TableCell align="right"><h3>{event.status}</h3></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};
