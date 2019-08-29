import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  card: {
    width: 600,
    margin: theme.spacing(3),
  },
  title: {
    fontSize: 20,
  },
  content: {
    display: 'inline-block',
  },
}));

export const VenueCard = (params) => {
  const classes = useStyles();
  const { venue } = params;
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {venue.name}
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {venue.address}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small"><Link to={`/venues/${venue.id}`}>Learn more</Link></Button>
      </CardActions>
    </Card>
  );
};