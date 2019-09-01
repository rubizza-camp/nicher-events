import React from 'react';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { FormTextField } from '../ui/TextFileds';
import { FormButton } from '../ui/Buttons';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import '../ui/Image.css';

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    let user = JSON.parse(localStorage.user_attributes);
    this.state = {
      user: {
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        photo: null
      }
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeFile = this.handleChangeFile.bind(this);
  }

  handleSave = (e) => {
    let headers = {};
    if (localStorage.user) {
      headers = JSON.parse(localStorage.user);
    }
    e.preventDefault();
    const data = new FormData();
    data.append('first_name', this.state.user.first_name);
    data.append('last_name', this.state.user.last_name);
    data.append('phone', this.state.user.phone);
    if (this.state.user.photo) {
      data.append('photo', this.state.user.photo);
    }
    headers['X-CSRF-Token'] = document.querySelector('meta[name="csrf-token"]').getAttribute(
      'content');
    var that = this;
    Axios({
      method: 'patch',
      url: '/auth',
      headers: headers,
      data: data
    }).then(response => {
      localStorage.setItem('user_attributes', JSON.stringify(response.data.data));
      that.props.history.push('/user_profile');
    }).catch(error => {
      that.setState({ errors: error.response.data.errors.full_messages });
    });
  };

  handleChange = (user) => {
    let currentUser = { ...this.state.user };
    currentUser[user.target.name] = user.target.value;
    this.setState({ user: currentUser });
  };

  handleChangeFile = (user) => {
    let currentUserFile = { ...this.state.user };
    currentUserFile[user.target.name] = user.target.files[0];
    this.setState({ user: currentUserFile });
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

    let image;
    let userRole;
    const { first_name, last_name, role } = JSON.parse(localStorage.user_attributes);
    userRole = `Your role ${role}`;
    let userInfo = `${first_name} ${last_name}`;
    image = <div data-hash="true">
      <img srcSet={JSON.parse(localStorage.user_attributes)['link_photo']}
        src="https://robohash.org/sitsequiquia.png?size=300x300&set=set1"
        className="Avatar"
        alt="avatar"
      />
    </div>;

    const { user } = this.state;
    return (
      <div>
        <div className="errors">
          {errorMessages}
        </div>
        <Card>
          <CardContent>
            <Grid container direction="column" justify="center" alignItems="center">
              <Grid container direction="row" justify="center" alignItems="center" >
                <Grid item>
                  {image}
                </Grid>
                <Grid item>
                  <Typography variant="h6"> Avatar: </Typography>
                  <input type="file"
                    name="photo"
                    accept="image/*"
                    onChange={this.handleChangeFile}
                  />
                </Grid>
              </Grid>
              <Typography variant="h5">
                {userInfo}
              </Typography>
              <Typography variant="h5">
                {userRole}
              </Typography>
            </Grid>
            <form onSubmit={this.handleSave}>
              <Grid container direction="column" justify="flex-start" alignItems="center" >
                <Grid item>
                  <FormTextField type="text"
                    name="first_name"
                    label="First name"
                    value={user.first_name}
                    onChange={this.handleChange} />
                </Grid>
                <Grid item>
                  <FormTextField type="text"
                    name="last_name"
                    label="Last name"
                    value={user.last_name}
                    onChange={this.handleChange} />
                </Grid>
                <Grid item>
                  <FormTextField type="text"
                    name="phone"
                    label="Phone"
                    value={user.phone}
                    onChange={this.handleChange}
                    mx="auto" />
                </Grid>
              </Grid>
              <Grid container justify="center" alignItems="center">
                <FormButton color="primary" text="update" />
              </Grid>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}
