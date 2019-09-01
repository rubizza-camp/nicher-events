import React from 'react';
import Axios from 'axios';
import { FormButton } from '../ui/Buttons';
import { FormTextField } from '../ui/TextFileds';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import PersonOutlineRoundedIcon from '@material-ui/icons/PersonOutlineRounded';
import MailRoundedIcon from '@material-ui/icons/MailRounded';
import PhoneRoundedIcon from '@material-ui/icons/PhoneRounded';
import HttpsIcon from '@material-ui/icons/Https';
import StoreIcon from '@material-ui/icons/Store';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import Card from '@material-ui/core/Card';
import { Message } from '../ui/Message';

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
            description: '',
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
    data.append('role', this.state.user.role);
    if (this.state.user.photo){
      data.append('photo', this.state.user.photo );
    }
    data.append('password', this.state.user.password);
    data.append('first_name', this.state.user.first_name );
    data.append('last_name', this.state.user.last_name);
    data.append('phone', this.state.user.phone );
    data.append('user_organization_attributes',  JSON.stringify(this.state.user.user_organization_attributes));
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
      errorMessages = <Message message={this.state.errors} variant='error' />;
    } 
    return (
      <div>
        <Grid container direction="column" justify="center" alignItems="center">
          <Card>
            <div className="errors">
              {errorMessages}
            </div>
            <Grid container direction="row" justify="center" alignItems="center">
              <h1>Sign Up</h1>
            </Grid>
            <form onSubmit={this.handleSignUp}>
              <Grid container direction="row" justify="center" alignItems="center">
                <div>
                  <Grid container direction="column" justify="flex-start" alignItems="center">
                    <div>
                      <PersonRoundedIcon fontSize='large' alignItems="flex-end" />
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
                  </Grid>
                </div>

                <div>
                  <Grid container direction="column" justify="flex-end" alignItems="flex-start" style={{margin: 20 }}>
                    <h1>Create Organization</h1>
                    <div>
                      <StoreIcon fontSize='large' />
                      <FormTextField type="text"
                        name="name"
                        label="Organization Name"
                        value={user.user_organization_attributes.organization_attributes.name}
                        onChange={this.handleChangeForOrganization} />  
                    </div>
                    <br/>
                    <div>
                      <SpeakerNotesIcon fontSize='large' />
                      <FormTextField type="text"
                        name="description"
                        label="Organization Description"
                        rows="10"
                        value={user.user_organization_attributes.organization_attributes.description}
                        onChange={this.handleChangeForOrganization} />  
                    </div>
                  </Grid>
                </div>
                <Grid container direction="row" justify="center" alignItems="flex-end">
                  <FormButton text="Sign up" />
                </Grid>
              </Grid>
            </form>
          </Card>
        </Grid>
      </div>
    );
  }
}
