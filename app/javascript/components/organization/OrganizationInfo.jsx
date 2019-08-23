import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { FormButton } from '../../ui/Buttons';

class OrganizationInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { organization: {} };
  }

  componentDidMount() {
    let headers = {};
    if (sessionStorage.user) {
      const userRole = JSON.parse(sessionStorage.user_attributes).role;
      if (userRole === 'organizer') {
        headers = JSON.parse(sessionStorage.user);
      } else {
        this.props.history.push('/');
      }
    }
    axios.get(`/api/v1/organizations/${this.props.match.params.id}`, { headers: headers })
      .then(res => {
        this.setState({organization: res.data});
      });
  }

  handleCancel() {
    this.props.history.push('/organizations');
  }

  render() {
    const editOrganizationUrl = `/organizations/${this.state.organization.id}/edit`;
    const organizationListUrl = '/organizations';
    let errorsMessage;
    if (this.state.errors)  {
      errorsMessage = <div>
        {this.state.errors.map((error) => (
          <p key={error.id}>{error}</p>
        ))}
      </div>;
    }
    return (
      <div>
        <Grid container direction="column" justify="center" alignItems="center">
          <p>{errorsMessage}</p>
          <h3>{this.state.organization.name}</h3>
          <p>{this.state.organization.description}</p>
          <p>
            <FormButton component={Link} to={editOrganizationUrl}
              color="primary" text="Edit" />
            <FormButton component={Link} to={organizationListUrl} text="Cancel" />
          </p>
        </Grid>  
      </div>
    );
  }
}

export default OrganizationInfo;
