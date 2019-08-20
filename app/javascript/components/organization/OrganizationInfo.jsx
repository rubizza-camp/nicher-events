import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class OrganizationInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { organization: {} };
  }

  componentDidMount() {
    debugger;
    let headers = {};
    let organizationInfo;
    if(sessionStorage.user) {
      const userRole = JSON.parse(sessionStorage.user_attributes).role;
      if(userRole === 'organizer') {
        headers = JSON.parse(sessionStorage.user)
      }
      else {
        this.props.history.push('/');
      }
    }
    axios.get(`/api/v1/organizations/${this.props.match.params.id}`, { headers: headers })
      .then(res => {
        this.setState({organization: res.data})
      })
      .catch(error => console.log('error', error))
  }

  handleCancel() {
    this.props.history.push(`/organizations`)
  }

  render() {
    debugger;
    const editOrganizationUrl = `/organizations/${this.state.organization.id}/edit`
    const organizationListUrl = '/organizations';
    let errorsMessage;
    if (this.state.errors)  {
      errorsMessage = <div>
        {this.state.errors.map((error) => {
          return(
            <p>{error}</p>
          );
        })}
        </div>
      }
    if(sessionStorage.user != null) {
      const userRole = JSON.parse(sessionStorage.user_attributes).role;
      const userOrganization = JSON.parse(sessionStorage.user_attributes).user_organization_attributes.organization_attributes;
      debugger;
      if(userRole === 'organizer'  && userOrganization === null) {
        createOrganizaton = <Link to={newOrganizationUrl} className="btn btn-outline-primary">Create Organization</Link>
      }
    }
    return (
      <div>
        <p>{errorsMessage}</p>
        <h3>{this.state.organization.name}</h3>
        <p>{this.state.organization.description}</p>
        <p>
          <Link to={editOrganizationUrl}
           className='btn btn-outline-dark'>Edit</Link>
          <Link to={organizationListUrl}
           className='btn btn-outline-dark'>Cancel</Link>
        </p>
        {createOrganizaton}
      </div>
    );
  }
}

export default OrganizationInfo;
