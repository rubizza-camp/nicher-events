import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  navButton: {
    fontWeight: 'bold'
  },
  button: {
    margin: theme.spacing(1),
    width: 165,
  }
}));

export const NavButtons = ({text: text = required, ...params}) => {
  const classes = useStyles();
  return (
      <Button component={NavLink} size="large" color="inherit" className={classes.navButton} {...params}>
        {text}
      </Button>
  );
};

export const FormButton = ({text: text = required, ...params})=>{
  const classes = useStyles();
  return (
    <Button type="submit" variant="contained" className={classes.button} {...params}>{text}</Button>
  );
}
