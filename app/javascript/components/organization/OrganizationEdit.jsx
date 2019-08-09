import React, { Component } from 'react';
import axios from 'axios';

class OrganizationEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}

	componentDidMount() {
	  axios.get(`api/v1/organizations/${this.props.match.params.id}`)
      .then(res =>{
        this.setState(res.data);
      })
      .catch(error => console.log('error', error))
	}

	handleSubmit = (organization) => {
    organization.preventDefault();
    axios.patch(`api/organizations/${this.props.match.params.id}`, this.state)
      .then(res => {
        this.setState(res.data);
      })
      .catch(error => console.log('error', error))
	}

	handleChange = (organization) => {
    this.setState({[organization.target.name]: organization.target.value})
	}

	handleCancel() {
    this.props.history.push(`/organizations/${this.state.id}`)
	}

	render() {
		return (
		  <div>
        <h1>Edit {this.state.name}</h1>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label>Name</label><br/>
            <input type='text' name='name' value={this.state.title}
            onChange={this.handleChange} className='form-control'/><br/>
            <label>Description</label><br/>
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
