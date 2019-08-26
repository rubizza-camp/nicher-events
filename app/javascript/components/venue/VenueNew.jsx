import React, { Component } from 'react';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { FormTextField } from '../../ui/TextFileds';
import { FormButton } from '../../ui/Buttons';

export default class VenueNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venue: { address: '', description: '', people_capacity: '' }
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
    if (sessionStorage.user) {
      headers = JSON.parse(sessionStorage.user);
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
      message = (
        <div>
          {this.state.errors.map(error => <p key={error.id}>{error}</p>)}
        </div>
      );
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
            People TextField
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
