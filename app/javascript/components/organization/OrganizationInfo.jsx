import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

class OrganizationInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { organization: {} };
  }

  componentDidMount() {
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
    const editOrganizationUrl = `/organizations/${this.state.organization.id}/edit`
    const organizationListUrl = '/organizations';
    let errorsMessage;

    const useStyles = makeStyles({
      card: {
        minWidth: 275,
        width: 700,
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },
    });

    const EditButton = () => {
      const classes = useStyles();
      return <Button component={Link} to={editOrganizationUrl} type="submit"
              variant="contained" color="primary" className={classes.button}>Edit</Button>
    }

    const CancelButon = () => {
      const classes = useStyles();
      return <Button component={Link} to={organizationListUrl} type="submit"
              variant="contained" color="primary" className={classes.button}>Cancel</Button>
    }

    const OrganizationCard = () => {
      const classes = useStyles();
      return (<Card className={classes.card}>
                <CardContent>
                  <Grid container direction="column" justify="center" alignItems="center">
                    <Typography variant="h5" component="h2">
                      {this.state.organization.name}
                    </Typography>
                  </Grid>
                   <Typography variant="body2" component="p">
                     {this.state.organization.description}
                   </Typography>
                </CardContent>
                <CardActions>
                  <EditButton />
                  <CancelButon />
                </CardActions>
              </Card>
        )
    }

    if (this.state.errors)  {
      errorsMessage = <div>
        {this.state.errors.map((error) => {
          return(
            <p>{error}</p>
          );
        })}
        </div>
      }
    return (
      <div>
        <Grid container direction="column" justify="center" alignItems="center">
          <p>{errorsMessage}</p>
          <OrganizationCard />
        </Grid>
      </div>
    );
  }
}

export default OrganizationInfo;
