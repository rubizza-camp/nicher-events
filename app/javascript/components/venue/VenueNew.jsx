import React, { Component } from 'react';
import Axios from 'axios';

export default class VenueNew extends Component {
  constructor(props) {
    super(props);
    
    this.state = { venue: { address: "", decription: "", people_capacity: "" } };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(venue) {
    this.setState({
      [venue.target.name]: venue.target.value
    });
  }

  handleSubmit(venue) {
    const { address, description, people_capacity } = this.state;

    Axios
      .post(
        "/api/v1/venues",
        {
          address: address,
          description: description,
          people_capacity: people_capacity
        },
        { withCredentials: true }
      )
      .then(response => {
        if (response.statusText === "Created") {
          this.props.handleSuccessfulAuth(response.data);
        }
      })
      .catch(error => {
        console.log("registration error", error);
      });
    venue.preventDefault();
  }

   render() {
    let message;
    if (this.state.errors) {
      message = <div>
                  {this.state.errors.map((error) => {
                    return(
                      <p>{error}</p>
                    )
                  })}
                </div>
    }
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
            value={this.state.address}
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
            value={this.state.description}
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
            value={this.state.people_capacity}
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