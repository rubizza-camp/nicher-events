import React from 'react';
import { green } from '@material-ui/core/colors';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { makeStyles } from '@material-ui/core/styles';
import { ErrorIcon, CheckCircleIcon } from './IconsCollection';

const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon,
};

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
  },
}));

export const  Message = (params) => {
  const classes = useStyles();
  const Icon = variantIcon[params.variant];
  return (
    <SnackbarContent
      className={classes[params.variant]}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon />
          {params.message}
        </span>
      }
    />
  );
};
