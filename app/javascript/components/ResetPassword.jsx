import React from 'react';
import Axios from 'axios';
import { FormButton } from '../ui/Buttons';
import { FormTextField } from '../ui/TextFileds';
import Grid from '@material-ui/core/Grid';
const queryString = require('query-string');

export default class ResetPasswordForm extends React.Component {
  constructor(props) {
    super(props);
    const parsed = queryString.parse(this.props.location.search);
    this.state = { user: { 
      password: '',
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
    }).then(() => {
      this.props.history.push('/sign_in');
    }).catch(error => {
      this.setState({ errors: error.response.data.errors.full_messages });
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
    return (
      <div>
        <div className="message">
          {message}
        </div>
        <form onSubmit={this.handleResetPassword}>
          <Grid container direction="column" justify="center"
            alignItems="center">
            <h1>Reset password</h1>
            <FormTextField type="password"
              name="password"
              label="Password"
              value={this.state.user.password}
              onChange={this.handleChange} />

            <FormTextField type="password"
              name="password_confirmation"
              label="Password confirmation"
              value={this.state.user.password_confirmation}
              onChange={this.handleChange} />

            <FormButton text="Submit" />
          </Grid>
        </form>
      </div>
    );
  }
}
