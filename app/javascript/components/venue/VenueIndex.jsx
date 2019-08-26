import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

export default class VenueIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { venues: [] };
  }

  componentDidMount() {
    Axios.get('/api/v1/venues')
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
        <Paper className="">
          <Table className="">
            <TableHead className="">
              <TableRow>
                <TableCell>
                  <h3>Address</h3>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.venues.map(venue => (
                <TableRow key={venue.address}>
                  <TableCell component="th" scope="row">
                    <h2>
                      <Link to={`/venues/${venue.id}`}>{venue.address}</Link>
                    </h2>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}
