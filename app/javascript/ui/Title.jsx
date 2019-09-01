import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  title: {
    fontWeight: 'bold',
    fontSize: 40,
    color: '#0000CD'
  },
}));

export const Title = (params) => {debugger;
  const classes = useStyles();
  const title = params.title;
  return(
    <Typography>
      <h1 className={classes.title}>{title}</h1>
    </Typography>
  );
}