import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  title: {
    fontWeight: 'bold',
    fontSize: 40,
    color: '#0000CD'
  },
  preTitle: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#0000CD'
  },
}));

export const Title = (params) => {
  const classes = useStyles();
  const title = params.title;
  return(
    <Typography>
      <h1 className={classes.title}>{title}</h1>
    </Typography>
  );
}

export const PreTitle = (params) => {
  const classes = useStyles();
  const title = params.title;
  return(
    <Typography>
      <h1 className={classes.preTitle}>{title}</h1>
    </Typography>
  );
}