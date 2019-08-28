import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { VpnKey, Home } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  icon: {
    margin: theme.spacing(2),
  },
}));

export const KeyIcon = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <VpnKey className={classes.icon} color="primary" />
    </div>
  );
};

export const HomeIcon = () => {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <Home className={classes.icon} color="primary" />
    </div>
  );
};
