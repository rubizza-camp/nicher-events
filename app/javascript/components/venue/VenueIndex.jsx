import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default class VenueIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { venues: [] };
  }

  componentDidMount() {
    let headers = {};
    if (sessionStorage.user) {
      headers = JSON.parse(sessionStorage.user);
    }
    headers['X-CSRF-Token'] = document
      .querySelector('meta[name=\'csrf-token\']')
      .getAttribute('content');
    Axios.get('/api/v1/venues', {
      headers: headers
    })
      .then(res => {
        this.setState({ venues: res.data });
      });
  }

  render() {
    const createVenueUrl = '/venues/new';
    const CreateButton = () => (
      <div>
        <Button
          component={Link}
          to={createVenueUrl}
          type="submit"
          variant="contained"
          color="primary"
          className=""
        >
          Create Venue
        </Button>
      </div>
    );

    let userRole;
    if (sessionStorage.user !== undefined) {
      userRole = JSON.parse(sessionStorage.user_attributes).role;
    }

    let createButton;
    if (userRole == 'organizer') {
      createButton = <CreateButton />;
    }

    return (
      <div>
        {createButton}
        <Grid container direction="column" justify="center" alignItems="center">
          {this.state.venues.map(venue => (
            <div key={venue.id}>
              <List aria-label="main mailbox folders">
                <ListItem button>
                  <ListItemText>
                    {venue.address}
                    <Button size="small"><Link to={`/venues/${venue.id}`}>Learn more</Link></Button>
                  </ListItemText>
                </ListItem>
              </List>
            </div>
          ))}
        </Grid>
      </div>
    );
  }
}
