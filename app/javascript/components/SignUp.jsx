import React from 'react';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

export default class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        phone: '',
        role: '',
        password_confirmation: ''
      }
    };
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSignUp = (e) => {
    e.preventDefault();
    Axios({
      method: 'post',
      url: '/auth',
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
      this.setState({ errors: error.response.data.errors.full_messages })
    })
  };

  handleChange = (user) => {
    const currentUser = this.state.user;
    currentUser[user.target.name] = user.target.value;
    this.setState(currentUser);
  };

  render() {
    const { user } = this.state;
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

    return (
      <div>
        <div className="errors">
          {errorMessages}
        </div>
        <form onSubmit={this.handleSignUp}>
          <Grid container direction="column" justify="center" style={{height: 700}}
                alignItems="center">
          <TextField type="text" name="first_name"
                     label="First name"
                     value={user.first_name}
                     onChange={this.handleChange}
                     margin="normal"
                     variant="outlined"/>


          <TextField type="text" name="last_name"
                     label="Last name"
                     value={user.last_name}
                     onChange={this.handleChange}
                     className="form-control" margin="normal"
                     variant="outlined"/>


          <TextField type="text" name="email"
                     label="Email name"
                     value={user.email}
                     onChange={this.handleChange}
                     className="form-control" margin="normal"
                     variant="outlined"/>


          <TextField type="text" name="phone"
                     label="Phone"
                     value={user.phone}
                     onChange={this.handleChange}
                     className="form-control" margin="normal"
                     variant="outlined"/>


          <TextField type="password" name="password"
                     label="Password"
                     value={user.password}
                     onChange={this.handleChange}
                     className="form-control" margin="normal"
                     variant="outlined"/>

          <TextField type="password" name="password_confirmation"
                     label="Password confirmation"
                     value={this.state.password_confirmation}
                     onChange={this.handleChange}
                     className="form-control" margin="normal"
                     variant="outlined"/>

          <Button type="submit" className="btn_sign_in" size="large"
                  variant="outlined" color="inherit" onClick={() => {
            user.role = 'organizer';
          }}>Sign up as organizer</Button>
          <Button type="submit" className="btn_sign_in" size="large"
                  variant="outlined" color="inherit" onClick={() => {
            user.role = 'attendee';
          }}> Sign up as attendee</Button>
          </Grid>
        </form>
      </div>
    );
  }
}
