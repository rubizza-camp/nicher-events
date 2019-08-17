import React from 'react';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

export default class ForgotPasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: { email: '', redirect_url: 'http://localhost:3000/reset_password' } };
    this.handleForgotPassword = this.handleForgotPassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleForgotPassword = (e) => {
    delete this.state.response_message;
    delete this.state.errors;
    e.preventDefault();
    Axios({
      method: 'post',
      url: '/auth/password',
      data: this.state.user
    }).then(response => {
        this.setState({ response_message: response.data.message })
      }).catch(error => {
        this.setState({ errors: error.response.data.errors })
      })
  };

  handleChange = (user) => {
    const currentUser = this.state.user;
    currentUser[user.target.name] = user.target.value;
    this.setState(currentUser);
  }

  render() {
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
    if (this.state.response_message) {
      message = <div>
                  {this.state.response_message}
                </div>
    }
    return (
      <div>
        {message}
        <form onSubmit={this.handleForgotPassword}>
        <Grid container direction="column" justify="center" alignItems="center">
          <div>
            <TextField style={{width: 350}}
              name="email" value={this.state.email} onChange={this.handleChange}
              id="outlined-name"
              label="E-mail"
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
