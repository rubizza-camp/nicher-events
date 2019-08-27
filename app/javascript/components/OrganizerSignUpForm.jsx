import React from 'react';
import Axios from 'axios';
import { FormButton } from '../ui/Buttons';
import { FormTextField } from '../ui/TextFileds';
import Grid from '@material-ui/core/Grid';

export default class OrganizerSignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        phone: '',
        role: 'organizer',
        photo: null,
        user_organization_attributes: {
          organization_attributes: {
            name: '',
            description: ''
          }}}
    };
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeFile = this.handleChangeFile.bind(this);
    this.handleChangeForOrganization = this.handleChangeForOrganization.bind(this);
  }

  handleSignUp = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('email', this.state.user.email);
    if (this.state.user.photo){
      data.append('photo', this.state.user.photo );
    }
    data.append('password', this.state.user.password);
    data.append('first_name', this.state.user.first_name );
    data.append('last_name', this.state.user.last_name);
    data.append('phone', this.state.user.phone );
    data.append('user_organization_attributes',
      data.append('organization_attributes',
        data.append('name', this.state.user.user_organization_attributes.organization_attributes.name)));
    data.append('user_organization_attributes',
      data.append('organization_attributes',
        data.append('description', this.state.user.user_organization_attributes.organization_attributes.description )));
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
      localStorage.setItem('organization_attributes', JSON.stringify(that.state.user.user_organization_attributes.organization_attributes));
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

  handleChangeFile = (user) => {
    let currentUserFile = {...this.state.user};
    currentUserFile[user.target.name] = user.target.files[0];
    this.setState({user: currentUserFile});
  };

  handleChangeForOrganization = (user) => {
    var currentUser = {...this.state.user};
    currentUser['user_organization_attributes']['organization_attributes'][user.target.name] = user.target.value;
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
              <FormTextField type="text"
                name="password"
                label="Password"
                value={user.password}
                onChange={this.handleChange} />  
            </div>

            <div>
              <FormTextField type="file"
                             name="photo"
                             accept="image/*"
                             ref={(input) => { user.photo = input }}
                             onChange={this.handleChangeFile} />
            </div>

            <h1>Create Organization</h1>
            <div>
              <FormTextField type="text"
                name="name"
                label="Organization Name"
                value={user.user_organization_attributes.organization_attributes.name}
                onChange={this.handleChangeForOrganization} />  
            </div>
            <br/>
            <div>
              <FormTextField type="text"
                name="description"
                label="Organization Description"
                rows="10"
                value={user.user_organization_attributes.organization_attributes.description}
                onChange={this.handleChangeForOrganization} />  
            </div>
            <FormButton text="Sign up" />
          </Grid>
        </form>
      </div>
    );
  }
}
