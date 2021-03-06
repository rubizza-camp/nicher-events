import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { FormButton } from '../../ui/Buttons';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class OrganizationInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { organization: {}, user_organization: {} };
    this.handleUserDelete = this.handleUserDelete.bind(this);
    this.isnotEmpty = this.isnotEmpty.bind(this);
    this.deleteButton = this.deleteButton.bind(this);
  }

  componentDidMount() {
    let headers = {};
    if (localStorage.user) {
      const userRole = JSON.parse(localStorage.user_attributes).role;
      if (userRole === 'organizer' && JSON.parse(localStorage.user_attributes).organization !== null) {
        headers = JSON.parse(localStorage.user);
      } else {
        this.props.history.push('/');
      }
    }
    axios.all([
      axios.get(`/api/v1/organizations/${this.props.match.params.id}`, { headers: headers }),
      axios.get(`/api/v1/organizations/${this.props.match.params.id}/user_organizations`, { headers: headers })
    ])
      .then(axios.spread((organizationResponse, userOrganizationResponse) => {
        this.setState({organization: organizationResponse.data, user_organization: userOrganizationResponse.data});
      }));
  }

  handleUserDelete = (e,user_organization_id) => {
    e.preventDefault();
    let headers = {};
    if (localStorage.user) {
      const userRole = JSON.parse(localStorage.user_attributes).role;
      if (userRole === 'organizer' && JSON.parse(localStorage.user_attributes).organization !== null) {
        headers = JSON.parse(localStorage.user);
      } else {
        this.props.history.push('/');
      }
    }
    headers['X-CSRF-Token'] = document.querySelector('meta[name=\'csrf-token\']').getAttribute('content');
    axios.delete(`/api/v1/organizations/${this.props.match.params.id}/user_organizations/${user_organization_id}`, { headers: headers })
      .then(() => {
        axios.get(`/api/v1/organizations/${this.props.match.params.id}/user_organizations`, { headers: headers })
          .then(response => {
            this.setState({user_organization: response.data });
          });
      })
      .catch(error => {
        if (error.response.statusText === 'Not Found')
          this.setState({ errors: ['You can\'t do this'] });
      });
  }

  deleteButton = (user_organization_id, user_id) => {
    if (JSON.parse(localStorage.user_attributes).id === this.state.organization.owner_id){
      if (user_id === this.state.organization.owner_id) {
        return <p>Owner</p>;
      }
      return <FormButton text="Delete" color="secondary" onClick={(e) => {this.handleUserDelete(e, user_organization_id);}} />;
    }
  }

  isnotEmpty = (obj) => Object.getOwnPropertyNames(obj).length >= 1

  render() {
    const editOrganizationUrl = `/organizations/${this.state.organization.id}/edit`;
    const mainPageUrl = '/';
    let errorsMessage;
    if (this.state.errors)  {
      errorsMessage = <div>
        {this.state.errors.map((error) => (
          <p key={error.id}>{error}</p>
        ))}
      </div>;
    }

    let userlist;
    if (this.isnotEmpty(this.state.user_organization)) {
      userlist = <div>{this.state.user_organization.map((user_org) => (
        <div key={user_org.user.id}>
          <hr/>
          <p><i>{user_org.user.first_name} {user_org.user.last_name}</i></p>
          <p>{user_org.user.email}</p>
          {this.deleteButton(user_org.id, user_org.user.id)}
        </div>
      ))}
      </div>;    
    }

    let eventList;
    if (this.state.organization.events !== undefined) {
      eventList = <div>
        {this.state.organization.events.map((event) => (
          <div key={event.id}>
            <Card>
              <CardContent>
                <Link to={'/events/' + event.id}><h3>{event.name}</h3></Link>
                <p>{event.date}</p>
                <p>{event.status}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>;
    }

    return (
      <div>
        <Grid container direction="column" justify="center" alignItems="center">
          <Card style={{width: 1000}}>
            <div>
              <Grid container direction="row" justify="center" alignItems="center" >
                <p>{errorsMessage}</p>
                <h1>{this.state.organization.name}</h1>
              </Grid>
            </div>
          
            <div>
              <Grid container direction="row" justify="center" alignItems="flex-start">
                <div>
                  <Grid container direction="column" justify="flex-start" alignItems="flex-start">
                    <Grid container direction="row" justify="flex-start" alignItems="flex-start" style={{margin: 100}}>
                      <h3>{this.state.organization.description}</h3>
                    </Grid>
                    <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                      <div>
                        {eventList}
                      </div>
                    </Grid>
                  </Grid>
                </div>

                <div>
                  <Grid container direction="column" justify="flex-end" alignItems="flex-start">
                    <Card style={{padding: 16}}>
                      <div>
                        <h3>Members</h3>
                      </div>
                      <div>{userlist}</div>
                    </Card>
                  </Grid>
                </div>
              </Grid>
            </div>

            <div>
              <Grid container direction="row" justify="center" alignItems="center">
                <p>
                  <FormButton component={Link} to={editOrganizationUrl}
                    color="primary" text="Edit" />
                  <FormButton component={Link} to={mainPageUrl} text="Cancel" />
                </p>
              </Grid>
            </div>
          </Card>
        </Grid>
      </div>
    );
  }
}

export default OrganizationInfo;
