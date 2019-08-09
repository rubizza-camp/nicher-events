import React, { Component } from 'react';
import axios from 'axios';

export default class VenueNew extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      address: "",
      decription: "",
      people_capacity: "",
      creationErrors: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const { address, description, people_capacity } = this.state;

    axios
      .post(
        "/api/venues",
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
    event.preventDefault();
  }

   render() {
    return (
      <div>
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
