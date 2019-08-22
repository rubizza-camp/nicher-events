import React from 'react';
import Grid from '@material-ui/core/Grid';
import { FormButton } from '../../ui/Buttons';
import { RadioGroupStatus } from '../../ui/RadioGroupStatus';
import { FormTextField } from '../../ui/FormTextField';
import DatePickers from '../../ui/DatePickers';

export default class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { event: {name: '', description: '', status: '', date: ''} };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    const updatedEvent = Object.assign({}, this.state.event);
    updatedEvent[event.target.name] = event.target.value;
    this.setState({ event: updatedEvent });
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    const newObjectEvent = Object.assign({}, newProps.event);
    this.setState({ event: newObjectEvent });
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
    const { event } = this.state;
    return (
      <form onSubmit={(e) => { this.props.handleSubmit(e, this.state.event); }}>
        {errorsMessage}
        <Grid container direction="column" justify="center" alignItems="center">
          <h1>Event</h1>
          <FormTextField
            value={event.name}
            name="name" 
            label="Name"
            onChange={this.handleChange}
          />
          <DatePickers onChange={this.handleChange} event_date={event.date} />
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
