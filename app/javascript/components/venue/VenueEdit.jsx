import React, { Component } from 'react';
import Axios from 'axios';

export default class VenueEdit extends Component {
  constructor(props) {
    super(props);
    this.state = { venue: { address: '', description: '', people_capacity: '' } };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (venue) => {
    const params = this.state;
    params['venue'][venue.target.name] = venue.target.value;
    this.setState({
      params
    });
  }

  handleSubmit = (venue) => {
  venue.preventDefault();
  const { venue: { address, description, people_capacity } } = this.state;
  let headers = {};
    if (sessionStorage.user) {
      headers = JSON.parse(sessionStorage.user);
    }
    headers['X-CSRF-Token'] = document.querySelector("meta[name='csrf-token']").getAttribute("content");
  Axios
    .patch(`/api/v1/venues/${this.props.match.params.id}`, this.state.venue, { headers: headers } )
    .then(data => this.props.history.push(`/venues`))
    .catch(err => this.setState({ errors: error.response.data.errors }))
  }

   render() {
    let errorMessages;
    if (this.state.errors) {
      errorMessages = <div>
        {this.state.errors.map((error) => {
          return (
            <p>{error}</p>
          )
        })}
      </div>
    }

    const { venue } = this.state
    return (
      <div>
      {errorMessages}
      <form onSubmit={this.handleSubmit}>
      <div className="form-group">
        Address:
        <p>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={venue.address}
            onChange={this.handleChange}
            required
          />
          </p>
        </div>
      <div className="form-group">
          Description:
        <p>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={venue.description}
            onChange={this.handleChange}
            required
          />
        </p>
      </div>
      <div className="form-group">
          People capacity:
      <p>
          <input
            type="number"
            name="people_capacity"
            value={venue.people_capacity}
            onChange={this.handleChange}
            required
          />
        </p>
      </div>
          <button type="submit" className="btn btn-success">Create</button>
        </form>
      </div>
    );
  }
}
