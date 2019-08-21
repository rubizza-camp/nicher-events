import React from 'react';
import Axios from 'axios';
import { FormButton } from '../ui/Buttons';
import { FormTextField } from '../ui/TextFileds';
import Grid from '@material-ui/core/Grid';
require('dotenv').config();

export default class ForgotPasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: { email: '', redirect_url: `${process.env.PRODUCTION_HOST}/reset_password` } };
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
      this.setState({ response_message: response.data.message });
    }).catch(error => {
      this.setState({ errors: error.response.data.errors });
    });
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
        {this.state.errors.map((error) => (
          <p key={error.id}>{error}</p>
        ))}
      </div>;
    }
    if (this.state.response_message) {
      message = <div>
        {this.state.response_message}
      </div>;
    }
    return (
      <div>
        <div className="message">
          {message}
        </div>
        <form onSubmit={this.handleForgotPassword}>
          <Grid container direction="column" justify="center"
            alignItems="center">

            <h1>Forgot Password</h1>
            <h3>
              Please enter your email address and we will send you <br />
              instructions on how to reset your password
            </h3>

            <FormTextField type="text"
              name="email"
              label="Email"
              value={this.state.user.email}
              onChange={this.handleChange} />

            <FormButton text="Submit" />
          </Grid>
        </form>
      </div>
    );
  }
}
