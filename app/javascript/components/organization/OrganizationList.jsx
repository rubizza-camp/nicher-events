import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class OrganizationList extends Component {
  constructor() {
    super();
    this.state = { organizations: [] };
  }

  componentDidMount() {
    axios.get('api/v1/organizations')
      .then(res => { 
        const organizations = res.data;
        this.setState({organizations})
      })
  }   

  render() {
    debugger;
    return (
      <div>
        {this.state.organizations.map((organization) => {
          return(
            <div key={organization.id}>
              <h2><Link to={`/organizations/${organization.id}`}>{organization.name}</Link></h2>
              {organization.description}
              <hr/>
            </div>
            
          )
        })}
        <Link to="/organizations/new" className="btn btn-outline-primary">Create Organization</Link> 
      </div>
    );
  }
}

export default OrganizationList;
