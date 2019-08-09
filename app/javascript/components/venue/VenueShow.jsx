import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

export default class VenueShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { venue: {} };
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    Axios.get(`/api/v1/venues/${this.props.match.params.id}`).then(res => {
      const venue = res.data;
      this.setState({ venue });
    });
  }

  handleDelete = () => {
    let headers = {};
    if (sessionStorage.user) {
      headers = JSON.parse(sessionStorage.user);
    }
    headers["X-CSRF-Token"] = document
      .querySelector("meta[name='csrf-token']")
      .getAttribute("content");
    Axios.delete(`/api/v1/venues/${this.props.match.params.id}`, {
      headers: headers
    })
      .then(data => this.props.history.push(`/venues`))
      .catch(err => this.setState({ errors: err.response.data }));
  };

  render() {
    const editVenueUrl = `/venues/${this.state.venue.id}/edit`;
    const showVenuesUrl = `/venues`;
    const createVenuesUrl = `/venues/new`;
    const EditButtons = () => (
      <div>
        <Button
          component={Link}
          to={editVenueUrl}
          type="submit"
          variant="contained"
          color="primary"
          className=""
        >
          Edit
        </Button>
        <Button
          onClick={this.handleDelete}
          variant="contained"
          color="secondary"
          className=""
        >
          Delete
        </Button>
      </div>
    );

    let userRole;
    if (sessionStorage.user !== undefined) {
      userRole = JSON.parse(sessionStorage.user_attributes).role;
    }

    let editButtons;
    if (userRole == "organizer") {
      editButtons = <EditButtons />;
    }

    let message;
    if (this.state.errors) {
      message = (
        <div>
          {this.state.errors.map(error => {
            return <p key={Math.random()}>{error}</p>;
          })}
        </div>
      );
    }

    return (
      <Grid container direction="column" justify="center" alignItems="center">
        {message}
        <h2>{this.state.venue.address}</h2>
        <p>
          <strong> ID:</strong> {this.state.venue.id}
        </p>
        <p>
          <strong> Description:</strong>
          {this.state.venue.description}
        </p>
        <Grid container direction="row" justify="center">
          {editButtons}
          <Button
            component={Link}
            to={showVenuesUrl}
            onClick={this.handleDelete}
            variant="contained"
            className=""
          >
            Back
          </Button>
        </Grid>
        <hr />
      </Grid>
    );
  }
}
