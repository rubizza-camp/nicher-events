import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { FormButton } from '../../ui/Buttons';

export default class VenueShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { venue: {} };
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    let headers = {};
    if (sessionStorage.user) {
      headers = JSON.parse(sessionStorage.user);
    }
    headers['X-CSRF-Token'] = document
      .querySelector('meta[name=\'csrf-token\']')
      .getAttribute('content');
    Axios.get(`/api/v1/venues/${this.props.match.params.id}`, { headers: headers }).then(res => {
      this.setState({ venue: res.data });
    });
  }

  handleDelete = () => {
    let headers = {};
    if (sessionStorage.user) {
      headers = JSON.parse(sessionStorage.user);
    }
    headers['X-CSRF-Token'] = document
      .querySelector('meta[name=\'csrf-token\']')
      .getAttribute('content');
    Axios.delete(`/api/v1/venues/${this.props.match.params.id}`, {
      headers: headers
    })
      .then(() => this.props.history.push('/venues'))
      .catch(error => {
        if (error.response.statusText === 'Forbidden') {
          this.setState({ errors: error.response.data.errors });
        } else {
          this.setState({ errors: error.response.data });
        }
      });
  };

  render() {
    const editVenueUrl = `/venues/${this.state.venue.id}/edit`;
    const showVenuesUrl = '/venues';
    const EditButtons = () => (
      <div>
        <FormButton component={Link} to={editVenueUrl} text="Edit" color="primary" />
        <FormButton onClick={this.handleDelete} text="Delete" color="secondary" />
      </div>
    );

    let userRole;
    if (sessionStorage.user !== undefined) {
      userRole = JSON.parse(sessionStorage.user_attributes).role;
    }

    let editButtons;
    if (userRole == 'organizer') {
      editButtons = <EditButtons />;
    }

    let message;
    if (this.state.errors) {
      message = (
        <div>
          {this.state.errors.map(error => <p key={error.id}>{error}</p>)}
        </div>
      );
    }

    return (
      <Grid container direction="column" justify="center" alignItems="center">
        {message}
        <h2>{this.state.venue.name}</h2>
        <p>
          <strong> Address:</strong> {this.state.venue.address}
        </p>
        <p>
          <strong> People capacity:</strong> {this.state.venue.people_capacity}
        </p>
        <p>
          <strong> Description:</strong>
          {this.state.venue.description}
        </p>
        <Grid container direction="row" justify="center">
          {editButtons}
          <FormButton component={Link} to={showVenuesUrl} text='Cancel' />
        </Grid>
        <hr />
      </Grid>
    );
  }
}
