import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';

export default class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { event: {name: '', description: '', status: '', date: ''} };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    const currentEvent = this.props.event;
    currentEvent[event.target.name] = event.target.value;
    this.setState(currentEvent);
  }

  render () {
    let errorsMessage;
    if (this.props.errors)  {
      errorsMessage = <ul>
                        {this.props.errors.map((error) => {
                          return(
                            <li>{error}</li>
                          );
                        })}
                      </ul>
    }
    const { event } = this.props;
    const useStyles = makeStyles(theme => ({
      button: {
        margin: theme.spacing(1),
        width: 165,
      },
      input: {
        display: 'none',
      },
      container: {
        display: 'flex',
        flexWrap: 'wrap',
       
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 350,
      },
      dense: {
        marginTop: 16,
      },
      menu: {
        width: 200,
      },
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

    const SaveButton = () => {
      const classes = useStyles();
      return <Button type="submit" variant="contained" color="primary" className={classes.button}>Save</Button>;
    }

    const CancelButton = () => {
      const classes = useStyles();
      return <Button type="button" onClick={this.props.handleCancel} variant="contained" className={classes.button}>Cancel</Button>
    }

    const RadioButtonStatus = () => {
      const classes = useStyles();
      return <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Status</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="status" onChange={this.handleChange}
          className={classes.group}
        >
          <div>
            <FormControlLabel value="social" control={<Radio color="primary"/>} checked={(event.status  === 'social')} label="Social" />
            <FormControlLabel value="confidential" control={<Radio color="primary"/>} checked={(event.status  === 'confidential')} label="Confidential" />
          </div> 
        </RadioGroup>
      </FormControl>
      </div>
    }
    const DateTime = () => {
      const classes = useStyles();
      return  <TextField
          id="datetime-local"
          name="date" value={event.date} onChange={this.handleChange}
          label="Date and Time"
          type="datetime-local"
          defaultValue="2019-08-17T02:46"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
      
    }

    return (
      <form onSubmit={this.props.handleSubmit}>
        {errorsMessage}
        <Grid container direction="column" justify="center" alignItems="center">
        <h1>Event</h1>
        <TextField style={{width: 350}}
          name="name" value={event.name}
          id="outlined-name"
          label="Name"
          margin="normal"
          variant="outlined"
          onChange={this.handleChange}
        />
        <DateTime />
        <RadioButtonStatus />
        <TextField style={{width: 350}}
          value={event.description}
          name="description"
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows="3"
          margin="normal"
          variant="outlined"
          onChange={this.handleChange}
        />
        <div className="btn-group">
          <SaveButton />
          <CancelButton />
        </div>
        </Grid>
      </form>
    );
  }
}
