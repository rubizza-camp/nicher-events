import React from 'react';
import Grid from '@material-ui/core/Grid';
import { FormButton } from '../../ui/Buttons';
import { RadioGroupStatus } from '../../ui/RadioGroupStatus';
import { FormTextField } from '../../ui/FormTextField';
import DatePicker from '../../ui/DatePicker';
import Axios from 'axios';

export default class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { event: {name: '', description: '', status: '', date: new Date(), event_layouts_attributes: { virtual_map: null }, event_venue: '' }, venues: [],
      prev_event: {name: '', description: '', status: '', date: new Date()} };
    this.fetchVenues = this.fetchVenues.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeForEventLayout = this.handleChangeForEventLayout.bind(this);
  }

  fetchVenues() {
    let headers = {};
    if (localStorage.user) {
      headers = JSON.parse(localStorage.user);
    }
    Axios.get('/api/v1/venues', { headers: headers })
      .then((response) => {
        this.setState({ venues: response.data });
      });
  }

  componentDidMount() {
    this.fetchVenues();
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
    updatedEvent['event_layouts_attributes'][event.target.name] = event.target.files[0];
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
          <h1>Event layout</h1>
          <input type="file"
            name="virtual_map"
            accept="image/*"
            onChange={this.handleChangeForEventLayout}
          />
          <h1>Venue</h1>
          <div className="btn-group">
            <FormButton text='Save' color="primary" />
            <FormButton text='Cancel' onClick={this.props.handleCancel} />
          </div>
        </Grid>
      </form>
    );
  }
}
