import React from 'react';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { FormTextField } from '../ui/TextFileds';
import { FormButton } from '../ui/Buttons';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    let user = JSON.parse(sessionStorage.user_attributes);
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
  }


  handleSave = (e) => {
    let headers = {};
    if (sessionStorage.user) {
      headers = JSON.parse(sessionStorage.user);
    }
    e.preventDefault();
    const data = new FormData();
    if (this.state.user.photo) {
      data.append('photo', this.state.user.photo);
    }
    data.append('first_name', this.state.user.first_name);
    data.append('last_name', this.state.user.last_name);
    data.append('phone', this.state.user.phone);
    headers['X-CSRF-Token'] = document.querySelector('meta[name="csrf-token"]').getAttribute(
      'content');
    var that = this;
    Axios({
      method: 'patch',
      url: '/auth',
      headers: headers,
      data: data
    }).then(response => {
      sessionStorage.setItem('user_attributes', JSON.stringify(response.data.data));
      that.props.history.push('/user_profile');
    }).catch(error => {
      that.setState({ errors: error.response.data.errors });
    });
  };


  handleChange = (user) => {
    var currentUser = { ...this.state.user };
    currentUser[user.target.name] = user.target.value;
    this.setState({ user: currentUser });
  };

  handleChangeFile = (user) => {
    let currentUserFile = { ...this.state.user };
    currentUserFile[user.target.name] = user.target.files[0];
    this.setState({ user: currentUserFile });
  };

  render() {

    let userInfo = '';
    let image;
    let user_role;
    if (sessionStorage.user_attributes !== undefined) {
      const { first_name, last_name, role } = JSON.parse(
        sessionStorage.user_attributes);
      user_role = `Your role ${role}`;
      userInfo = `${first_name} ${last_name}`;
      if (JSON.parse(sessionStorage.user_attributes)['link_photo']) {
        image = <img
          src={JSON.parse(sessionStorage.user_attributes)['link_photo']}
          width="200" height="200"
          alt="avatar"
        />
      } else {
        image = <img
          src="https://robohash.org/sitsequiquia.png?size=300x300&set=set1"
          width="200" height="200"
          alt="avatar"
        />
      }
    }
    const { user } = this.state;
    return (
      <div>


          <Card>
            <CardContent>
              <Grid container direction="column" justify="center" alignItems="center">
                {image}
                <Typography variant="h5">
                  {userInfo}
                </Typography>
                <Typography variant="h5">
                  {user_role}
                </Typography>
              </Grid>
              <form onSubmit={this.handleSave}>
                <Grid container direction="row" justify="center" alignItems="center">
                  <div>
                    <FormTextField type="text"
                                   name="first_name"
                                   label="First name"
                                   value={user.first_name}
                                   onChange={this.handleChange}/>
                  </div>

                  <div>
                    <FormTextField type="text"
                                   name="last_name"
                                   label="Last name"
                                   value={user.last_name}
                                   onChange={this.handleChange}/>
                  </div>
                </Grid>
                <Grid container direction="row" justify="center" alignItems="center">
                  <div>
                    <FormTextField type="text"
                                   name="phone"
                                   label="Phone"
                                   value={user.phone}
                                   onChange={this.handleChange}/>
                  </div>

                  <div>
                    <FormTextField type="file"
                                   name="photo"
                                   accept="image/*"
                                   ref={(input) => {
                                     user.photo = input
                                   }}
                                   onChange={this.handleChangeFile}/>
                  </div>
                </Grid>
                <Grid container justify="center" alignItems="center">
                  <FormButton color='primary' text="update"/>
                </Grid>

              </form>
            </CardContent>
          </Card>
      </div>
    );
  }
}

