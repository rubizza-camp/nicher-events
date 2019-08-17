import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

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
    axios.get('/api/v1/organizations', { headers: headers, params: sessionStorage.user})
      .then(res => {this.setState({organizations: res.data})})
      .catch(error => console.log('error', error))
  }

  componentDidMount() {
    this.avaliableOrganizations();
  }

  render() {
      const useStyles = makeStyles(theme => ({
      root: {
        width: '90%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
      },
      table: {
        minWidth: 650,
      },
      button: {
      margin: theme.spacing(1),
      width: 165,
      },
    }));

    const newOrganizationUrl = '/organizations/new'
    let createOrganizaton;

    const CreateButton = () => {
      const classes = useStyles();
      return <Button component={Link} to={newOrganizationUrl} type="submit" variant="contained" color="primary" className={classes.button}>Create Organization</Button>
    }
    
    if(sessionStorage.user != null) {
      const userRole = JSON.parse(sessionStorage.user_attributes).role;
      if(userRole === 'organizer') {
        createOrganizaton = <CreateButton />
      }
    }

    const OrganizationTable = () => {
      const classes = useStyles();
      return (
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead className={classes.head}>
              <TableRow>
                <TableCell><h3>Name</h3></TableCell>
                <TableCell align="left"><h3>Description</h3></TableCell>
              </TableRow>
            </TableHead>
          <TableBody>
            {this.state.organizations.map((organization) => (
              <TableRow key={organization.name}>
                <TableCell component="th" scope="row">
                  <h2><Link to={`/organizations/${organization.id}`}>{organization.name}</Link></h2>
                </TableCell>
                <TableCell align="left">{organization.description.substr(0,74)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          </Table>
        </Paper>
    );}
    return (
       <div>
        
        <div>{createOrganizaton}</div>
        <Grid container direction="column" justify="center" alignItems="center">
          <OrganizationTable />
        </Grid>
      </div>
    );
  }
}

export default OrganizationList;
