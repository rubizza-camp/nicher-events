import React, { Component } from 'react';
import axios from 'axios';

class OrganizationAdd extends Component {
	constructor() {
		super();
		this.state = { name: '', description: ''};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}

	handleSubmit(organization) {
	  organization.preventDefault();
    axios.post('api/v1/organizations', this.state)
      .then(data => {
        this.props.history.push(`/organizations/${data.id}`);
      })
      .catch(error => console.log('error', error))
	}

	handleChange(organization) {
    this.setState({[organization.target.name]: organization.target.value});
	}

	handleCancel() {
    this.props.history.push('/#/organizations')
	}

	render() {
		return(
		  <div>
		  	<h1></h1>
		  	<form onSubmit={this.handleSubmit}>
		  	  <div className='form-group'>
            <label>Name</label>
            <br/>
            <input type='text' name='name' value={this.state.name} 
            onChange={this.handleChange} className='form-control' />
	        </div>
	        <br/>
	        <div>
	          <label>Description</label>
	          <br/>
	          <textarea name='description' rows='10' value={this.state.description}
	          onChange={this.handleChange} className='form-controls' />
	        </div>
	        <div class='btn-group'>
	          <button type='submit' className='btn btn-dark'>Create</button>
	          <button type='button' onClick={this.handleCancel} 
	          className='btn btn-secondary'>Cancel</button>
	        </div>
  		  </form>
		  </div>
			)
	}
}

export default OrganizationAdd;
