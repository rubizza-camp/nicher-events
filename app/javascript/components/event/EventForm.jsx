import React from 'react';
import Grid from '@material-ui/core/Grid';
import { FormButton } from '../../ui/Buttons';
import { RadioGroupStatus } from '../../ui/RadioGroupStatus';
import { FormTextField } from '../../ui/FormTextField';
import DatePicker from '../../ui/DatePicker';

export default class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { event: {name: '', description: '', status: '', date: new Date(), event_layout_attributes: { virtual_map: null, venue_id: null } } };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeForEventLayoutFile = this.handleChangeForEventLayoutFile.bind(this);
    this.handleChangeForEventLayout = this.handleChangeForEventLayout.bind(this);
  }

  handleChange = (event) => {
    var prevState = {...this.state};
    var updatedEvent = {...this.state.event};
    updatedEvent[event.target.name] = event.target.value;
    this.setState({ ...prevState, event: updatedEvent });
  }

  handleChangeForEventLayout = (event) => {
    var prevState = {...this.state};
    var updatedEvent = {...this.state.event};
    updatedEvent['event_layout_attributes'][event.target.name] = event.target.value;
    this.setState({ ...prevState, event: updatedEvent });
  }

  handleChangeForEventLayoutFile = (event) => {
    var prevState = {...this.state};
    var updatedEvent = {...this.state.event};
    updatedEvent['event_layout_attributes'][event.target.name] = event.target.files[0];
    this.setState({ ...prevState, event: updatedEvent });
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    var newEvent = {...newProps.event};
    this.setState({ event: newEvent });
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
          <DatePicker onChange={this.handleChange} event_date={event.date} />
          <RadioGroupStatus onChange={this.handleChange} event_status={event.status} />
          <FormTextField
            value={event.description}
            name="description"
            label="Description"
            multiline
            rows="3"
            onChange={this.handleChange}
          />
          <h1>List venue</h1>
          <input
            name="venue_id"
            onChange={this.handleChangeForEventLayout}
          />

          <h1>Event layout</h1>
          <input type="file"
            name="virtual_map"
            accept="image/*"
            onChange={this.handleChangeForEventLayoutFile}
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
