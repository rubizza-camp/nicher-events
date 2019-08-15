import React, { Component } from 'react';
import Axios from 'axios';

export default class VenueNew extends Component {
  constructor(props) {
    super(props);
    
    this.state = { venue: { address: '', description: '', people_capacity: '' } };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(venue) {
    const params = this.state;
    params['venue'][venue.target.name] = venue.target.value;
    this.setState({
      params
    });
  }

  handleSubmit(venue) {
    venue.preventDeffault();
    const { venue: { address, description, people_capacity } } = this.state;
    const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    Axios
      .post(
        "/api/v1/venues",
        this.state.venue,
        { withCredentials: true },
        { headers: { 'X-CSRF-Token': csrf } }
      )
      .then(data => this.props.history.push(`/venues`))
      .catch(err => this.setState({ errors: err.response.data }))
  }

   render() {
    let message;
    if (this.state.errors) {
      message = <div>
                  {this.state.errors.map((error) => {
                    return(
                      <p key={Math.random()}>{error}</p>
                    )
                  })}
                </div>
    }

    const { venue } = this.state
    return (
      <div>
      {message}
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
