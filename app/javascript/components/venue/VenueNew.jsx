import React, { Component } from 'react';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { FormTextField } from '../../ui/TextFileds';
import { FormButton } from '../../ui/Buttons';
import { Message } from '../../ui/Message';

export default class VenueNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venue: { name: '', address: '', description: '', people_capacity: '' }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (venue) => {
    var prevState = {...this.state};
    var updatedVenue = {...this.state.venue};
    updatedVenue[venue.target.name] = venue.target.value;
    this.setState({ ...prevState, venue: updatedVenue });
  }

  handleSubmit(event) {
    event.preventDefault();
    let headers = {};
    if (localStorage.user) {
      headers = JSON.parse(localStorage.user);
    }
    headers['X-CSRF-Token'] = document
      .querySelector('meta[name=\'csrf-token\']')
      .getAttribute('content');
    Axios.post('/api/v1/venues', { venue: this.state.venue }, { headers: headers })
      .then(() => this.props.history.push('/venues'))
      .catch(error => {
        if (error.response.statusText === 'Forbidden') {
          this.setState({ errors: error.response.data.errors });
        } else {
          this.setState({ errors: error.response.data });
        }
      });
  }

  render() {
    let message;
    if (this.state.errors) {
      message = <Message message={this.state.errors} variant='error' />;
    }

    const { venue } = this.state;
    return (
      <div>
        <div>{message}</div>
        <form onSubmit={this.handleSubmit}>
          <Grid
            container
            direction="column"
            justify="center"
            style={{ height: 700 }}
            alignItems="center"
          >
            Name:
            <FormTextField
              type="text"
              name="name"
              placeholder="Name"
              value={venue.name}
              onChange={this.handleChange}
            />
            Address:
            <FormTextField
              type="text"
              name="address"
              placeholder="Address"
              value={venue.address}
              onChange={this.handleChange}
            />
            Description:
            <FormTextField
              type="text"
              name="description"
              placeholder="Description"
              value={venue.description}
              onChange={this.handleChange}
            />
            People capacity:
            <FormTextField
              type="number"
              name="people_capacity"
              value={venue.people_capacity}
              onChange={this.handleChange}
            />
            <FormButton text="Create" />
          </Grid>
        </form>
      </div>
    );
  }
}
