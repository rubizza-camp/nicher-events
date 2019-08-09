import React, { Component } from 'react';
import Axios from 'axios';

export default class EventAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', description: '', status: '', date: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    Axios.post('api/events', this.state)
      .then(response => {
        this.props.history.push(`/events/${response.data.id}`);
      })
      .catch(error => console.log('error', error))
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleCancel = () => {
    this.props.history.push("/events");
  }

  render() {
    return (
      <div>
        <h1>Create Article Post</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor='name'>Name</label> <br/>
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor='date'>Date</label> <br/>
            <input type="datetime-local" name="date" value={this.state.date} onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor='status'>Status : </label> <br/>
            <input type="radio" id='status_social' name="status" onChange={this.handleChange} value="social" />
            <label>Social</label> <br/>
            <input id='status_confidential' type="radio" name="status" onChange={this.handleChange} value="confidential" />
            <label>Confidential</label>
          </div>
          <div className="form-group">
            <label htmlFor='description'>Description</label> <br/>
            <textarea name="description" rows="5" value={this.state.description} onChange={this.handleChange} className="form-control" />
          </div>
          <div className="btn-group">
            <button type="submit" className="btn btn-dark">Create</button>
            <button type="button" onClick={this.handleCancel} className="btn btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
    );
  }
}
