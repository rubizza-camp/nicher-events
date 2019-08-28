import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles({
  card: {
    width: 800,
    marginBottom:10,
  },
  title: {
    fontSize: 14,
  },
  content: {
    width: 800,
  },
});

export const  CommentCard = (params) => {
  const classes = useStyles();
  let errorsMessage;
  if (params.errors)  {
    errorsMessage = <ul>
      {params.errors.map((error) => (
        <li key={error.id}>{error}</li>
      ))}
    </ul>;
  }
  return (
    <Card className={classes.card} >
      {errorsMessage}
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {params.comment.user.email}
        </Typography>
        <Typography className={classes.content} variant="h5" component="h2">
          {params.comment.text}
          <Rating value={params.comment.rating} disabled />
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {params.comment.created_at}
        </Typography>
      </CardContent>
      <CardActions>
        {params.delete_button}
        {params.update_form}
      </CardActions>
    </Card>
  );
};
