import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  group: {
    margin: theme.spacing(1, 0),
    width: 350,
  },
}));

export const RadioGroupStatus = (params)=>{
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Status</FormLabel>
        <RadioGroup aria-label="gender" name="status" onChange={params.onChange} className={classes.group}>
          <div>
            <FormControlLabel value="social" control={<Radio color="primary"/>} checked={(params.event_status  === 'social')} label="Social" />
            <FormControlLabel value="confidential" control={<Radio color="primary"/>} checked={(params.event_status  === 'confidential')} label="Confidential" />
          </div> 
        </RadioGroup>
      </FormControl>
    </div>
  );
};
