import React, { Component } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

class OrganizationForm extends Component {
  constructor(props) {
    super(props);
    this.state = { organization: { name: '', description: '' } };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(organization) {
    const currentOrganization = this.props.organization;
    currentOrganization[organization.target.name] = organization.target.value;
    this.setState(currentOrganization);
  }

  render() {
    const {organization} = this.props;
    return(
      <form onSubmit={this.props.handleSubmit}>
        <p>{this.props.errors}</p>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <br/>
          <input type='text' name='name' value={organization.name}
           onChange={this.handleChange} className='form-control' />
        </div>
        <br/>
        <div>
          <label htmlFor='description'>Description</label>
          <br/>
          <textarea name='description' rows='10' value={organization.description}
           onChange={this.handleChange} className='form-controls' />
        </div>
        <div class='btn-group'>
          <button type='submit' className='btn btn-dark'>Save</button>
          <button type='button' onClick={this.props.handleCancel}
           className='btn btn-secondary'>Cancel</button>
        </div>
      </form>
    );
  }
}

export default OrganizationForm;
