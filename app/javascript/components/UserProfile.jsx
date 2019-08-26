import React from 'react';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { FormTextField } from '../ui/TextFileds';
import { FormButton } from '../ui/Buttons';

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
   let user = JSON.parse(sessionStorage.user_attributes)
    this.state = {
      user: {
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone
      }
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeFile = this.handleChangeFile.bind(this)
  }


  handleSave = (e) => {
    let headers = {};
    if (sessionStorage.user) {
      headers = JSON.parse(sessionStorage.user);
    }
    e.preventDefault();
    debugger;
    var that = this;
    Axios({
      method: 'patch',
      url: '/auth',
      headers: headers,
      data: this.state.user
    }).then(response => {
      sessionStorage.setItem('user_attributes', JSON.stringify(response.data.data));
      that.props.history.push('/');
    }).catch(error => {
      that.setState({ errors: error.response.data.errors });
    });
  };



  handleChange = (user) => {
    var currentUser = {...this.state.user};
    currentUser[user.target.name] = user.target.value;
    this.setState({user: currentUser});
  };

  handleChangeFile = (user) => {
    var currentUser = {...this.state.user};
    currentUser[user.target.name] = user.target.files[0];
    this.setState({user: currentUser});
  }

  render() {
    let userInfo = '';

    if (sessionStorage.user_attributes !== undefined) {
      const { first_name, last_name, role } = JSON.parse(
        sessionStorage.user_attributes);
      userInfo = `${first_name} ${last_name} ${role}`;
    }
    const { user } = this.state;
    return (
      <div className="App">
        <div className="container">
          <Grid container direction="column" justify="flex-start" alignItems="flex-start">
            {userInfo}
          </Grid>
          <form onSubmit={this.handleSave}>
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
                               name="phone"
                               label="Phone"
                               value={user.phone}
                               onChange={this.handleChange} />
              </div>


              <div>
                <FormTextField type="file"
                               name="photo"
                               accept="image/*"
                               ref={(input) => { user.photo = input }}
                               label="Password"
                               onChange={this.handleChangeFile} />
              </div>
              <FormButton text="update" />
            </Grid>
          </form>
        </div>
      </div>
    );
  }
}


