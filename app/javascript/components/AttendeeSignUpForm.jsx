import React from 'react';
import Axios from 'axios';
import { FormButton } from '../ui/Buttons';
import { FormTextField } from '../ui/TextFileds';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
const queryString = require('query-string');
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import PersonOutlineRoundedIcon from '@material-ui/icons/PersonOutlineRounded';
import MailRoundedIcon from '@material-ui/icons/MailRounded';
import PhoneRoundedIcon from '@material-ui/icons/PhoneRounded';
import HttpsIcon from '@material-ui/icons/Https';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';

export default class AttendeeSignUpForm extends React.Component {
  constructor(props) {
    super(props);
    const parsed = queryString.parse(this.props.history.location.search);
    let redirect_url;
    if (Object.entries(parsed).length !== 0) {
      redirect_url = `${parsed.redirect_url}?token=${parsed.token}`;
    }
    this.state = {
      user: {
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        phone: '',
        role: 'attendee',
        photo: null
      },
      redirect_url: redirect_url,
    };
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeFile = this.handleChangeFile.bind(this);
  }

  handleSignUp = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('email', this.state.user.email);
    data.append('role', this.state.user.role);
    if (this.state.user.photo){
      data.append('photo', this.state.user.photo );
    }
    data.append('password', this.state.user.password);
    data.append('first_name', this.state.user.first_name );
    data.append('last_name', this.state.user.last_name);
    data.append('phone', this.state.user.phone );
    var that = this;
    Axios({
      method: 'post',
      url: '/auth',
      data: data
    }).then(response => {
      localStorage.setItem('user',
        JSON.stringify({
          'access-token': response.request.getResponseHeader('access-token'),
          'token-type': response.request.getResponseHeader('token-type'),
          client: response.headers['client'],
          expiry: response.headers['expiry'],
          uid: response.headers['uid']
        }));
      localStorage.setItem('user_attributes', JSON.stringify(response.data.data));
      if (this.state.redirect_url) {
        this.props.history.push(this.state.redirect_url);
      } else {
        this.props.history.go(-1);
      }
    }).catch(error => {
      that.setState({ errors: error.response.data.errors.full_messages });
    });
  };

  handleChange = (user) => {
    var currentUser = {...this.state.user};
    currentUser[user.target.name] = user.target.value;
    this.setState({user: currentUser});
  };

  handleChangeFile = (user) => {
    let currentUserFile = {...this.state.user};
    currentUserFile[user.target.name] = user.target.files[0];
    this.setState({user: currentUserFile});
  };

  render() {
    const { user } = this.state;
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
        <Box borderColor="secondary.main" borderRadius={10}>
          <Grid container direction="column" justify="center" alignItems="center">
            <Card style={{width:600}}>
              <div className="errors">
                {errorMessages}
              </div>
              <Grid container direction="column" justify="center" alignItems="center">
                <h1>Sign Up</h1>
              </Grid>
              <form onSubmit={this.handleSignUp}>
                <Grid container direction="column" justify="center" alignItems="center">
                  <div>
                    <PersonRoundedIcon fontSize='large' alignItems="center" />
                    <FormTextField type="text"
                      name="first_name"
                      label="First name"
                      value={user.first_name}
                      onChange={this.handleChange} />
                  </div>

                  <div>
                    <PersonOutlineRoundedIcon fontSize='large' />
                    <FormTextField type="text"
                      name="last_name"
                      label="Last name"
                      value={user.last_name}
                      onChange={this.handleChange} />  
                  </div>

                  <div>
                    <MailRoundedIcon fontSize='large' />
                    <FormTextField type="text"
                      name="email"
                      label="E-mail"
                      value={user.email}
                      onChange={this.handleChange} />  
                  </div>

                  <div>
                    <PhoneRoundedIcon fontSize='large' />
                    <FormTextField type="text"
                      name="phone"
                      label="Phone"
                      value={user.phone}
                      onChange={this.handleChange} />  
                  </div>

                  <div>
                    <HttpsIcon fontSize='large' />
                    <FormTextField type="password"
                      name="password"
                      label="Password"
                      value={user.password}
                      onChange={this.handleChange} />  
                  </div>

                  <div>
                    <Typography variant="h6">
                      Avatar:
                    </Typography>
                    <input type="file"
                      name="photo"
                      accept="image/*"
                      onChange={this.handleChangeFile}
                    />
                  </div>
                  <FormButton text="Sign up" />
                </Grid>
              </form>
            </Card>
          </Grid>
        </Box>
      </div>
    );
  }
}
