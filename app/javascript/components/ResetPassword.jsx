import React from 'react';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
const queryString = require('query-string');

export default class ResetPasswordForm extends React.Component {
  constructor(props) {
    super(props);
    const parsed = queryString.parse(this.props.location.search);
    this.state = { user: { password: '',
                           password_confirmation: '',
                           'access-token': parsed['access-token'],
                           client: parsed.client,
                           uid: parsed.uid
                          }
                  };
    this.handleResetPassword = this.handleResetPassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleResetPassword = (e) => {
    e.preventDefault();
    Axios({
      method: 'put',
      url: '/auth/password',
      data: this.state.user
    }).then(response => {
      this.props.history.push('/sign_in');
      }).catch(error => {
        this.setState({ errors: error.response.data.errors.full_messages })
      })
  };

  handleChange = (user) => {
    const currentUser = this.state.user;
    currentUser[user.target.name] = user.target.value;
    this.setState(currentUser);
  }

  render() {
    let message;
    if (this.state.errors) {
      message = <div>
                  {this.state.errors.map((error) => {
                    return(
                      <p>{error}</p>
                    )
                  })}
                </div>
    }
    const useStyles = makeStyles(theme => ({
      button: {
        margin: theme.spacing(1),
        width: 165,
      },
    }));
    const SaveButton = () => {
      const classes = useStyles();
      return <Button type="submit" variant="contained" color="primary" className={classes.button}>Submit</Button>;
    }
    return (
      <div>
        {message}
        <form onSubmit={this.handleResetPassword}>
          <Grid container direction="column" justify="center" alignItems="center">
            <h1>Reset password</h1>
            <div>
              <TextField style={{width: 350}}
                name="password" value={this.state.password} onChange={this.handleChange}
                id="outlined-name"
                label="Password"
                margin="normal"
                variant="outlined"
              />
            </div>
            <div>
              <TextField style={{width: 350}}
                  name="password_confirmation" value={this.state.password_confirmation} onChange={this.handleChange}
                  id="outlined-name"
                  label="Password_confirmation"
                  margin="normal"
                  variant="outlined"
                />
            </div>
            <SaveButton />
          </Grid>
        </form>
      </div>
    );
   }
}
