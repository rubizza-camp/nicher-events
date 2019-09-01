import React from 'react';
import Axios from 'axios';
import { FormButton } from '../ui/Buttons';
import { FormTextField } from '../ui/TextFileds';
import Grid from '@material-ui/core/Grid';
import { MailRoundedIcon } from '../ui/IconsCollection';
import Card from '@material-ui/core/Card';
import { Title } from '../ui/Title';
require('dotenv').config();
import { Message } from '../ui/Message';

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
      this.setState({ response_message: [response.data.message] });
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
    const title = 'Forgot Password';
    if (this.state.errors) {
      message = <Message message={this.state.errors} variant='error' />;
      
    }
    if (this.state.response_message) {
      message = <Message message={this.state.response_message} variant='success' />;
    }
    return (
      <Grid container direction="column" justify="center" alignItems="center">
        <Card>
          <div>
            <div className="message">
              {message}
            </div>
            <form onSubmit={this.handleForgotPassword}>
              <Grid container direction="column" justify="center"
                alignItems="center">

                <Title title={title} />
                <h3>
                  Please enter your email address and we will send you <br />
                  instructions on how to reset your password
                </h3>

                <div>
                  <MailRoundedIcon />
                  <FormTextField type="text"
                    name="email"
                    label="Email"
                    value={this.state.user.email}
                    onChange={this.handleChange} />
                </div>

                <FormButton text="Submit" />
              </Grid>
            </form>
          </div>
        </Card>
      </Grid>
    );
  }
}
