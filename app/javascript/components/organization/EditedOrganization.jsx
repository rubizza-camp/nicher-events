import React, { Component } from 'react';
import axios from 'axios';
import OrganizationForm from './OrganizationForm'

class EditedOrganization extends Component {
  constructor(props) {
    super(props);
    this.state = { organization: { name: '', description: ''} };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
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
    axios.get(`/api/v1/organizations/${this.props.match.params.id}`, { headers: headers })
      .then(res =>{ this.setState({ organization: res.data });
       })
      .catch(error => console.log('error', error.data.error.message))
  }

  handleSubmit = (organization) => {
    organization.preventDefault();
    let headers = {};
    if(sessionStorage.user) {
      const userRole = JSON.parse(sessionStorage.user_attributes).role;
      if(userRole === 'organizer') {
        headers = JSON.parse(sessionStorage.user);
      }
    }
    headers['X-CSRF-Token'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    axios.patch(`/api/v1/organizations/${this.props.match.params.id}`, this.state.organization,
                { headers: headers })
      .then(res => {
        this.props.history.push(`/organizations/${this.state.organization.id}`)
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
    this.props.history.push(`/organizations/${this.state.organization.id}`)
  }

  render() {
    let organizationForm;
    if(sessionStorage.user) {
      const userRole = JSON.parse(sessionStorage.user_attributes).role;
      if(userRole === 'organizer') {
        organizationForm = <OrganizationForm organization={this.state.organization}
         handleSubmit={this.handleSubmit} handleCancel={this.handleCancel} errors={this.state.errors} />
      }
    }
    return (
      <div>
        <h1>Edit</h1>
        {organizationForm}
      </div>
    );
  }
}

export default EditedOrganization;
