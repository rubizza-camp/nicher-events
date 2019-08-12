import React, { Component } from 'react';
import Axios from 'axios';

export default class VenueEdit extends Component {
  constructor(props) {
    super(props);
    
    this.state = { venue: { address: '', description: '', people_capacity: '' } };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentDidMount() {
  //   Axios.get(`/api/v1/venues/${this.props.match.params.id}`)
  //     .then(res => this.setState({ venue: res.data }))
  //     .catch(error => console.log('error', error))
  // }

  handleChange(venue) {
    this.setState({
      [venue.target.name]: venue.target.value
    });
  }

  handleSubmit = (venue) => {
  venue.preventDefault();
  const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
  Axios.patch(`/api/v1/venues/${this.props.match.params.id}`, this.state.venue, 
              { headers: { 'X-CSRF-Token': csrf } })
    .then(data => this.props.history.push(`/venues/${this.state.venue.id}`))
    .catch(err => this.setState({ errors: err.response.data }))
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
      <h2><strong>Edit venue:</strong></h2>
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