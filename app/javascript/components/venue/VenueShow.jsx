import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

export default class VenueShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { venue: {} };
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    Axios.get(`/api/v1/venues/${this.props.match.params.id}`)
      .then(res => {
        const venue= res.data;
        this.setState({venue});
      })
  }

  handleDelete = () => {
    let headers = {};
    if (sessionStorage.user) {
      headers = JSON.parse(sessionStorage.user);
    }
    headers['X-CSRF-Token'] = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    Axios.delete(`/api/v1/venues/${this.props.match.params.id}`, { headers: headers })
      .then(() => {
        this.props.history.push("/venues")
      })
  }

  render() {
    const editVenueUrl = `/venues/${this.state.venue.id}/edit`
    const showVenuesUrl = `/venues`
    return (
      <div className="jumbotron">
        <h2>{this.state.venue.address}</h2>
        <p> <strong> ID:</strong> {this.state.venue.id}</p>
        <p><strong> Description:</strong>{this.state.venue.description}</p>
        <p>
          <Link to={editVenueUrl} className="btn btn-outline-dark">Edit</Link> 
          <button onClick={this.handleDelete} className="btn btn-outline-dark">Delete</button> 
          <Link to={showVenuesUrl} className="btn btn-outline-dark">Close</Link>
        </p>
        <hr/>
      </div>
    )
  }
}
