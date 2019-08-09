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
    Axios.get(`api/venues/${this.props.match.params.id}`)
      .then(res => {
        const venue= res.data;
        this.setState({ venue});
      })
  }

  handleDelete() {
    Axios.delete(`api/venues/${this.props.match.params.id}`)
      .then(() => {
        this.props.history.push("/")
      })
  }

  render() {
    return (
      <div className="jumbotron">
        <h2>{this.state.venue.id}</h2>
        <p>{this.state.venue.address}</p>
        <p>{this.state.venue.description}</p>
        <p>
          <Link to={`/venues/${this.state.venue.id}/edit`} className="btn btn-outline-dark">Edit</Link> 
          <button onClick={this.handleDelete} className="btn btn-outline-dark">Delete</button> 
          <Link to="/events" className="btn btn-outline-dark">Close</Link>
        </p>
        <hr/>
      </div>
    )
  }
}