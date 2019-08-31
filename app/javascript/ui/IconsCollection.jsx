import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { VpnKey, Home, Edit, Delete, Error, CheckCircle } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  icon: {
    margin: theme.spacing(2),
  },
  iconComment: {
    margin: theme.spacing(1),
  },
  iconMessage: {
    marginRight: theme.spacing(1),
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

export const EditIcon = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Edit className={classes.iconComment} color="primary" />
    </div>
  );
};

export const DeleteIcon = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Delete className={classes.iconComment} color="primary" />
    </div>
  );
};

export const CheckCircleIcon = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CheckCircle className={classes.iconMessage} />
    </div>
  );
};

export const ErrorIcon = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Error className={classes.iconMessage} />
    </div>
  );
};
