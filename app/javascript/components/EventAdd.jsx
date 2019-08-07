import React, { Component } from 'react';
import Axios from 'axios';

export default class ArticleAdd extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '', content: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    Axios.post('api/events', this.state)
      .then(response => console.log(response))
      .then(data => {
        this.props.history.push(`/events/${data.id}`);
      })
      .catch(error => window.location = "/#/events")
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
            <label>Name</label> <br/>
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} className="form-control" />
          </div>
          <div className="form-group">
            <label>Date</label> <br/>
            <input type="text" name="date" value={this.state.date} onChange={this.handleChange} className="form-control" />
          </div>
          <div className="form-group">
            <label>Status</label> <br/>
            <input type="text" name="status" value={this.state.status} onChange={this.handleChange} className="form-control" />
          </div>
          <div className="form-group">
            <label>Description</label> <br/>
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
