import React, { Component } from 'react';

export default class EventForm extends React.Component {
  render (){
    return (
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
    )
  }
}
