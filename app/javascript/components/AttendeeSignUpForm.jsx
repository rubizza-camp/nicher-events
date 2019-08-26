import React from 'react';
import Axios from 'axios';
import { FormButton } from '../ui/Buttons';
import { FormTextField } from '../ui/TextFileds';
import Grid from '@material-ui/core/Grid';

export default class AttendeeSignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        phone: '',
        role: 'attendee'
      }
    };
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSignUp = (e) => {
    e.preventDefault();
    var that = this;
    Axios({
      method: 'post',
      url: '/auth',
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
      sessionStorage.setItem('user_attributes', JSON.stringify(response.data.data));
      sessionStorage.removeItem('sign_up');
      that.props.history.push('/');
    }).catch(error => {
      that.setState({ errors: error.response.data.errors.full_messages });
    });
  };

  handleChange = (user) => {
    var currentUser = {...this.state.user};
    currentUser[user.target.name] = user.target.value;
    this.setState({user: currentUser});
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
        <div className="errors">
          {errorMessages}
        </div>
        <Grid container direction="column" justify="center" alignItems="center">
          <h1>Sign Up</h1>
        </Grid>
        <form onSubmit={this.handleSignUp}>
          <Grid container direction="column" justify="center" alignItems="center">
            <div>
              <FormTextField type="text"
                name="first_name"
                label="First name"
                value={user.first_name}
                onChange={this.handleChange} />
            </div>

            <div>
              <FormTextField type="text"
                name="last_name"
                label="Last name"
                value={user.last_name}
                onChange={this.handleChange} />  
            </div>

            <div>
              <FormTextField type="text"
                name="email"
                label="E-mail"
                value={user.email}
                onChange={this.handleChange} />  
            </div>

            <div>
              <FormTextField type="text"
                name="phone"
                label="Phone"
                value={user.phone}
                onChange={this.handleChange} />  
            </div>

            <div>
              <FormTextField type="password"
                name="password"
                label="Password"
                value={user.password}
                onChange={this.handleChange} />  
            </div>
            <FormButton text="Sign up" />
          </Grid>
        </form>
      </div>
    );
  }
}
