import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 350,
  }
}));

export default class DatePickers extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedDate: new Date()};
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleDateChange = (date) => {
    const currentDate = new Date(date);
    const currentDateHash = {target: {name: 'date', value: date}};
    this.setState({selectedDate: currentDate});
    this.props.onChange(currentDateHash);    
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    this.setState({ selectedDate: newProps.event_date });
  }

  shouldComponentUpdate(nextProps) {
    return this.props.event_date !== nextProps.event_date;
  }

  render () {
    const DateAndTime = () => {
      const classes = useStyles();
      return <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container direction="column" justify="center" alignItems="center">
          <KeyboardDatePicker
            className={classes.textField}
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            label="Date picker"
            value={this.state.selectedDate}
            onChange={this.handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardTimePicker
            className={classes.textField}
            margin="normal"
            label="Time picker"
            value={this.state.selectedDate}
            onChange={this.handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>;
    };
    return (
      <DateAndTime />
    );
  }
}
