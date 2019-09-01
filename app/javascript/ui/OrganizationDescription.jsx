import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  h3: {
    minWidth: 300,
    maxWidth: 500,
    margin: 5,
    marginTop: 1,
    alignItems: 'flex-start'
  },
}));

export const OrganizationDescription = (params) => {
      const classes = useStyles();
      const description = params.description;
      return (
        <h3 className={classes.h3}>{description}</h3>
      );
    }

