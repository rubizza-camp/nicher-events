import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 350,
  }
}));

export const FormTextField = (params) => {
  const classes = useStyles();
  return (
    <TextField className={classes.textField} margin="normal" variant="outlined" {...params} />
  );
}
