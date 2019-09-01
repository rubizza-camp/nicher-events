import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  cardMember: {
    minWidth: 275,
    margin: theme.spacing(3),
  },
  cardEvent: {
    minWidth: 400,
    maxWidth: 600,
    margin: theme.spacing(3),
  },
  p: {
    margin: theme.spacing(1),
    marginRight: 2,
  }
}));

export const OrganizationEventCard = (params) => {
  const classes = useStyles();
  const event = params.event;

  return (
    <div key={event.id}>
      <Card className={classes.cardEvent}>
        <CardContent>
          <Link to={'/events/' + event.id}><h3>{event.name}</h3></Link>
          <p className={classes.p}>{event.date}</p>
          <p className={classes.p}>{event.status}</p>
        </CardContent>
      </Card>
    </div>
  );
}

export const OrganizationMemberCard = (params) => {
  const classes = useStyles();
  const userList = params.users;

  return (
    <Card className={classes.cardMember}>
      <CardContent>
      <h3>Members</h3>
      <div>
        {userList.map((user_org) => (
      <div key={user_org.user.id}>
        <hr/>
        <p><i>{user_org.user.first_name} {user_org.user.last_name}</i></p>
        <p>{user_org.user.email}</p>
      </div>
    ))}
      </div>
        <Link to={'/events/' + event.id}><h3>{event.name}</h3></Link>
        <p className={classes.p}>{event.date}</p>
        <p className={classes.p}>{event.status}</p>
      </CardContent>
    </Card>
  );
}