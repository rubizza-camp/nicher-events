import React from 'react';
import Grid from '@material-ui/core/Grid';
import { FormButton } from '../../ui/Buttons';
import { RadioGroupStatus } from '../../ui/RadioGroupStatus';
import { FormTextField } from '../../ui/FormTextField';
import MaterialUIPickers from '../../ui/DateAndTime';

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
        {this.props.errors.map((error) => (
          <li key={error.id}>{error}</li>
        ))}
      </ul>;
    }
    const { event } = this.props;
    return (
      <form onSubmit={this.props.handleSubmit}>
        {errorsMessage}
        <Grid container direction="column" justify="center" alignItems="center">
          <h1>Event</h1>
          <FormTextField
            value={event.name}
            name="name" 
            label="Name"
            onChange={this.handleChange}
          />
          <MaterialUIPickers onChange={this.handleChange} event_date={event.date} />
          <RadioGroupStatus onChange={this.handleChange} event_status={event.status} />
          <FormTextField
            value={event.description}
            name="description"
            label="Description"
            multiline
            rows="3"
            onChange={this.handleChange}
          />
          <div className="btn-group">
            <FormButton text='Save' color="primary" />
            <FormButton text='Cancel' onClick={this.props.handleCancel} />
          </div>
        </Grid>
      </form>
    );
  }
}
