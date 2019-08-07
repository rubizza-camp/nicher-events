import React, { Component } from 'react';
import axios from 'axios';
import OrganizationForm from './OrganizationForm';

class NewOrganization extends Component {
  constructor(props) {
    super(props);
    this.state = { organization: {name: '', description: ''} };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleSubmit = (organization) => {
    organization.preventDefault();
    let headers = {};
    if(sessionStorage.user) {
      const userRole = JSON.parse(sessionStorage.user_attributes).role;
      if(userRole === 'organizer') {
        headers = JSON.parse(sessionStorage.user);
      }
      else {
        this.props.history.push('/');
      }
    }
    headers['X-CSRF-Token'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    axios.post('/api/v1/organizations', this.state.organization, { headers: headers })
      .then(res => {
        this.props.history.push(`/organizations/${res.data.id}`);
      })
      .catch(error => {
        if(error.response.statusText == 'Unauthorized') {
          this.setState({ errors: error.response.statusText });
        }
        if(error.response.statusText == 'Unprocessable Entity') {
          this.setState({ errors: error.response.statusText });
        }
      })      
  }

  handleCancel() {
    this.props.history.push('/organizations');
  }

  render() {
    let organizationForm;
    if(sessionStorage.user) {
      const userRole = JSON.parse(sessionStorage.user_attributes).role;
      if(userRole === 'organizer') {
        organizationForm = <OrganizationForm organization={this.state.organization}
         handleSubmit={this.handleSubmit} errors={this.state.errors} handleCancel={this.handleCancel} />
      }
    }
    return(
      <div>
        <h1>Create new organization</h1>
        {organizationForm}
      </div>
    );
  }
}

export default NewOrganization;
