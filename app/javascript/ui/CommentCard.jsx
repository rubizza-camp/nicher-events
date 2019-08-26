import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  card: {
    width: 800,
    marginBottom:10,
  },
  // bullet: {
  //   display: 'inline-block',
  //   margin: '0 2px',
  //   transform: 'scale(0.8)',
  // },
  title: {
    fontSize: 14,
  },
  content: {
    display: 'inline-block',
  },
});

export const  CommentCard = (params) => {
  const classes = useStyles();
  return (
    <Grid container direction="column" justify="center" alignItems="center" >
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {params.user.email}
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
    </Grid>
    // <List className={classes.root}>
    //     <ListItem alignItems="flex-start">
    //       {/* <ListItem{params.comment.rating}Avatar>
    //       <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
    //       </ListItemAvatar> */}
    //       <ListItemText
    //       primary={params.user.email}
    //       secondary={
    //         <React.Fragment>
    //         <Typography
    //             component="span"
    //             variant="body2"
    //             className={classes.inline}
    //             color="textPrimary"
    //         >
    //             {params.comment.created_at}
    //         </Typography>
    //         {params.comment.text}
            
    //         {params.delete_button}
    //         {params.update_form}
    //         </React.Fragment>
    //       }
    //       />
    //       {/* <ListItemSecondaryAction>
    //                 <IconButton edge="end" aria-label="delete">
    //                   Delete
    //                 </IconButton>
    //               </ListItemSecondaryAction> */}
    //     </ListItem>
    //     <Divider variant="inset" component="li" />
    // </List>
  );
}
