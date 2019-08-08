import React, { Component } from 'react';
import Axios from 'axios';

export default class EventEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    Axios.get(`api/events/${this.props.match.params.id}`)
      .then(res => {
        this.setState(res.data);
      })
      .catch(error => console.log('error', error))
  }

  handleSubmit = (event) => {
    event.preventDefault();
    Axios.patch(`api/events/${this.props.match.params.id}`, this.state)
      .then(response => console.log(response))
      .then(data => {
        this.props.history.push(`/events/${this.state.id}`);
      })
      .catch(error => console.log('error', error));
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleCancel = () => {
    this.props.history.push(`/events/${this.state.id}`);
  }

  render() {
    const isStatus = this.state.status;
    return (
      <div>
        <h1>Edit {this.state.title}</h1>
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
            <label>Status : </label> <br/>

            {isStatus=='social' ? (
              <input type="radio" id='status_social' name="status" onChange={this.handleChange} value="social" checked />
            ) : (
              <input type="radio" id='status_social' name="status" onChange={this.handleChange} value="social" />
            )}
            <label htmlFor='status_social'>Social</label> <br/>

            {isStatus=='confidential' ? (
              <input id='status_confidential' type="radio" name="status" onChange={this.handleChange} value="confidential" checked/>
            ) : (
              <input id='status_confidential' type="radio" name="status" onChange={this.handleChange} value="confidential" />
            )}
            <label htmlFor='status_confidential'>Confidential</label>
            
          </div>
          <div className="form-group">
            <label htmlFor='description'>Description</label> <br/>
            <textarea name="description" rows="5" value={this.state.description} onChange={this.handleChange} className="form-control" />
          </div>
          <div className="btn-group">
            <button type="submit" className="btn btn-dark">Update</button>
            <button type="button" onClick={this.handleCancel} className="btn btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
    );
  }
}
