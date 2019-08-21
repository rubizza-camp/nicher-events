import React from 'react';
import Axios from 'axios';
import { FormButton } from '../ui/Buttons';
import { FormTextField } from '../ui/TextFileds';
import Grid from '@material-ui/core/Grid';
import { NavButtons } from '../ui/Buttons';

export default class SigInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: { email: '', password: '' } };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (sessionStorage.user){
      this.props.history.push('/');
    }
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
          client: response.headers['client'],
          expiry: response.headers['expiry'],
          uid: response.headers['uid']
        }));
      sessionStorage.setItem('user_attributes',
        JSON.stringify(response.data.data));
      this.props.history.push('/');
    }).catch(error => {
      this.setState({ errors: error.response.data.errors });
    });
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
        {this.state.errors.map((error) => (
          <p key={error.id}>{error}</p>
        ))}
      </div>;
    }

    return (
      <div>
        <div className="errors">
          {errorMessages}
        </div>
        <form onSubmit={this.handleSignIn}>
          <Grid container direction="column" justify="center"
            alignItems="center">
            <FormTextField type="text"
              name="email"
              label="Email"
              value={this.state.user.email}
              onChange={this.handleChange} />

            <FormTextField type="password"
              name="password"
              label="Password"
              value={this.state.user.password}
              onChange={this.handleChange} />

            <FormButton text="Sign in" />

            <NavButtons to="/forgot_password" text='Forgot password?' />
          </Grid>
        </form>
      </div>
    );
  }
}
