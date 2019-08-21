import React, { Component } from 'react';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

export default class VenueEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venue: { address: '', description: '', people_capacity: '' }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = venue => {
    const params = this.state;
    params['venue'][venue.target.name] = venue.target.value;
    this.setState({
      params
    });
  };

  handleSubmit = venue => {
    venue.preventDefault();
    let headers = {};
    if (sessionStorage.user) {
      headers = JSON.parse(sessionStorage.user);
    }
    headers['X-CSRF-Token'] = document
      .querySelector('meta[name=\'csrf-token\']')
      .getAttribute('content');
    Axios.patch(
      `/api/v1/venues/${this.props.match.params.id}`,
      this.state.venue,
      { headers: headers }
    )
      .then(() => this.props.history.push('/venues'))
      .catch(err => this.setState({ errors: err.response.data }));
  };

  render() {
    let message;
    if (this.state.errors) {
      message = (
        <div>
          {this.state.errors.map(error => <p key={Math.random()}>{error}</p>)}
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
            <TextField
              type="text"
              name="address"
              placeholder="Address"
              value={venue.address}
              onChange={this.handleChange}
              className="form-control"
              margin="normal"
              variant="outlined"
            />
            Description:
            <TextField
              type="text"
              name="description"
              placeholder="Description"
              value={venue.description}
              onChange={this.handleChange}
              className="form-control"
              margin="normal"
              variant="outlined"
            />
            People TextField
            <TextField
              type="number"
              name="people_capacity"
              value={venue.people_capacity}
              onChange={this.handleChange}
              className="form-control"
              margin="normal"
              variant="outlined"
            />
            <button
              type="submit"
              className=""
              size="large"
              variant="outlined"
              color="inherit"
            >
              Update
            </button>
          </Grid>
        </form>
      </div>
    );
  }
}
