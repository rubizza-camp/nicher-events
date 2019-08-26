import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { HomeIcon, KeyIcon } from './IconsCollection';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 275,
    margin: theme.spacing(3),
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

export const  EventCard = (params) => {
  const classes = useStyles();
  const { event } = params;
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
    );
  }
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography>
          <IconPanel event={event} />
        </Typography>
        <Typography variant="h5" component="h2">
          {event.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {event.date}
        </Typography>
        <Typography variant="body2" component="p">
          {event.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small"><Link to={`/events/${event.id}`}>Learn more</Link></Button>
      </CardActions>
    </Card>
  );
};
