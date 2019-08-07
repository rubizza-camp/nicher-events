import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class OrganizationList extends Component {
  constructor() {
    super();
    this.state = { organizations: [] };
    this.avaliableOrganizations = this.avaliableOrganizations.bind(this);
  }

  avaliableOrganizations() {
    let headers = {};
    if(sessionStorage.user) {
      const userRole = JSON.parse(sessionStorage.user_attributes).role;
      if(userRole != 'organizer') {
        this.props.history.push('/');
      }
      headers = JSON.parse(sessionStorage.user);
    }
    axios.get('/api/v1/organizations', { headers: headers, params: sessionStorage.user })// authenticateUser })
      .then(res => {this.setState({organizations: res.data})})
      .catch(error => console.log('error', error))
  }

  componentDidMount() {
    this.avaliableOrganizations()
  }

  render() {
    const newOrganizationUrl = '/organizations/new'
    let createOrganizaton;
    if(sessionStorage.user != null) {
      const userRole = JSON.parse(sessionStorage.user_attributes).role;
      if(userRole === 'organizer') {
        createOrganizaton = <Link to={newOrganizationUrl} className="btn btn-outline-primary">Create Organization</Link>
      }
    }
    return (
      <div>
        {this.state.organizations.map((organization) => {
          return(
            <div key={organization.id}>
              <h2><Link to={`/organizations/${organization.id}`}>{organization.name}</Link></h2>
              <p>{organization.description}</p>
              <hr/>
            </div>
          )
        })}
        <div>{createOrganizaton}</div>
      </div>
    );
  }
}

export default OrganizationList;
