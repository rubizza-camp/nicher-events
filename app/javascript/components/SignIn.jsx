import React from 'react';
import Axios from 'axios';
import { FormButton } from '../ui/Buttons';
import { FormTextField } from '../ui/TextFileds';
import Grid from '@material-ui/core/Grid';
import { NavButtons } from '../ui/Buttons';
const queryString = require('query-string');
import Card from '@material-ui/core/Card';
import { Message } from '../ui/Message';
import { MailRoundedIcon, HttpsIcon } from '../ui/IconsCollection';
import { Title } from '../ui/Title';

export default class SigInForm extends React.Component {
  constructor(props) {
    super(props);
    const parsed = queryString.parse(this.props.location.search);
    let redirect_url;
    if (Object.entries(parsed).length !== 0) {
      redirect_url = `${parsed.redirect_url}?token=${parsed.token}`;
    }
    this.state = { user: { email: '', password: '' }, redirect_url: redirect_url };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (localStorage.user ){
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
      localStorage.setItem('user',
        JSON.stringify({
          'access-token': response.request.getResponseHeader('access-token'),
          'token-type': response.request.getResponseHeader('token-type'),
          client: response.headers['client'],
          expiry: response.headers['expiry'],
          uid: response.headers['uid']
        }));
      localStorage.setItem('user_attributes',
        JSON.stringify(response.data.data));
      if (this.state.redirect_url) {
        this.props.history.push(this.state.redirect_url);
      } else {
        this.props.history.go(-1);
      }
    }).catch(error => {
      this.setState({errors: error.response.data.errors});
    });
  };

  handleChange = (user) => {
    const currentUser = this.state.user;
    currentUser[user.target.name] = user.target.value;
    this.setState(currentUser);
  };

  render() {
    let errorMessages;
    const title = 'Sign In';
    if (this.state.errors) {
      errorMessages = <Message message={this.state.errors} variant='error' />;
    }

    return (
      <div>
        <Grid container direction="column" justify="center" alignItems="center">
          <Card style={{padding: 16}}>
            <div className="errors">
              {errorMessages}
            </div>
            <div>
              <Grid container direction="column" justify="center" alignItems="center">
                <Title title={title} />
              </Grid>  
            </div>
            <form onSubmit={this.handleSignIn}>
              <Grid container direction="column" justify="center" alignItems="center">
                <div>
                  <MailRoundedIcon />
                  <FormTextField type="text"
                    name="email"
                    label="Email"
                    value={this.state.user.email}
                    onChange={this.handleChange} />
                </div>
                <div>
                  <HttpsIcon />
                  <FormTextField type="password"
                    name="password"
                    label="Password"
                    value={this.state.user.password}
                    onChange={this.handleChange} />
                </div>
                <FormButton text="Sign in" />

                <NavButtons to="/forgot_password" text='Forgot password?' />
              </Grid>
            </form>
          </Card>
        </Grid>
      </div>
    );
  }
}
