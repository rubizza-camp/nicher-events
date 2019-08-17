import React from 'react';
import Axios from 'axios';
import { NavLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';


export default class SigInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: { email: '', password: '' } };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSignIn = (e) => {
    e.preventDefault();
    Axios({
      method: 'post',
      url: '/auth/sign_in',
      data: this.state.user
    }).then(response => {
      sessionStorage.setItem('user',
        JSON.stringify({
          'access-token': response.request.getResponseHeader('access-token'),
          'token-type': response.request.getResponseHeader('token-type'),
          client: response.headers["client"],
          expiry: response.headers["expiry"],
          uid: response.headers["uid"]
        }));
      sessionStorage.setItem('user_attributes', JSON.stringify(response.data.data));
      this.props.history.push('/')
    }).catch(error => {
      this.setState({ errors: error.response.data.errors })
    })
  };

  handleChange = (user) => {
    const currentUser = this.state.user;
    currentUser[user.target.name] = user.target.value;
    this.setState(currentUser);
  };

  render() {
    let errorMessages;
    if (this.state.errors) {
      errorMessages = <div>
        {this.state.errors.map((error) => {
          return (
            <p>{error}</p>
          )
        })}
      </div>
    }

    const useStyles = makeStyles(theme => ({
      button: {
        margin: theme.spacing(1),
      },
      input: {
        width: 350,
      },
    }));

    const SubmitButton = () => {
      const classes = useStyles();
      return <Button type="submit" className={classes.button} size="large"
                     variant="outlined" color="inherit">Sign in
      </Button>;

    };

    return (
      <div>
        <div className="errors">
          {errorMessages}
        </div>
        <form onSubmit={this.handleSignIn}>
          <Grid style={{height: 500}} container direction="column" justify="center"
                alignItems="center" spacing={0} >
            <TextField type="text"
                       name="email"
                       label="Email"
                       value={this.state.user.email}
                       onChange={this.handleChange}
                       className="form-control"
                       margin="normal"
                       variant="outlined"/>

          <div>
            <NavLink exact
                     className="nav-link"
                     activeClassName="active"
                     to="/forgot_password"> (Forgot password?)</NavLink>
            <br/>
            <TextField type="password" name="password"
                       label="Password"
                       value={this.state.user.password}
                       onChange={this.handleChange}
                       className="form-control" margin="normal"
                       variant="outlined"/>
          </div>

          <SubmitButton />
          </Grid>
        </form>
      </div>
    );
  }
}
