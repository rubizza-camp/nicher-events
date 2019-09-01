import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  textFieldForm: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400,
  },
  textFieldComment: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400,
  }
}));

export const FormTextField = (params) => {
  const classes = useStyles();
  return (
    <TextField className={classes.textFieldForm} margin="normal" variant="outlined" {...params} />
  );
};

export const CommentTextField = (params) => {
  const classes = useStyles();
  return (
    <TextField className={classes.textFieldComment} margin="normal" variant="outlined" {...params} />
  );
};
