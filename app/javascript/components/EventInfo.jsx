import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

export default class ArticleInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { event: {} };
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    Axios.get(`api/events/${this.props.match.params.id}`)
      .then(res => {
        const event= res.data;
        this.setState({ event});
      })
  }

  handleDelete() {
    Axios.delete(`api/events/${this.props.match.params.id}`)
      .then(() => {
        this.props.history.push("/events")
      })
  }

  render() {
    return (
      <div>
        <h2>{this.state.event.id}: {this.state.event.name} - {this.state.event.status}</h2>
        <p>{this.state.event.date}</p>
        <p>{this.state.event.description}</p>
        <p>
          <Link to={`/events/${this.state.event.id}/edit`} className="btn btn-outline-dark">Edit</Link> 
          <button onClick={this.handleDelete} className="btn btn-outline-dark">Delete</button> 
          <Link to="/events" className="btn btn-outline-dark">Close</Link>
        </p>
        <hr/>
      </div>
    )
  }
}
