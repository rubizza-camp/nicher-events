import React, { Component } from 'react';
import axios from 'axios';

class OrganizationEdit extends Component {
	constructor() {
		super();
		this.state = {name: '', description: ''};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}

	componentDidMount() {

	}

	handleSubmit() {

	}

	handleChange() {

	}

	handleCancel() {

	}

	render() {
		return (
		  <div>
        <h1>Edit {this.state.name}</h1>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label>Name</label>
            <input type='text' name='name' value={this.state.title}
            onChange={this.handleChange} className='form-control'/>
            <label>Description</label>
            <textarea name='description' rows='10' value={this.state.description}
            onChange={this.handleChange} className='form-control' />
          </div>
          <div className='btn-group'>
            <button type='submit' className='btn btn-dark'>Edit</button>
            <button type='button' onClick={this.handleCancel}
            className='btn btn-secondary'>Cancel</button>
          </div>
        </form> 
      </div>
			)
	}
}

export default OrganizationEdit;