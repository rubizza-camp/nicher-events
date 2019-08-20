import React from 'react';
import Axios from 'axios';
import {withRouter} from 'react-router';

class SignUpFormOrganizer extends React.Component {
  constructor(props) {
    super();
    this.state = {
      user: {
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        phone: '',
        role: 'organizer',
        user_organization_attributes: {
          organization_attributes: {
            name: '',
            description: ''
        }}}
    };
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeForOrganization = this.handleChangeForOrganization.bind(this);
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
          client: response.headers["client"],
          expiry: response.headers["expiry"],
          uid: response.headers["uid"]
        }));
      sessionStorage.setItem('user_attributes', JSON.stringify(response.data.data));
      sessionStorage.setItem('organization_attributes', JSON.stringify(that.state.user_organization_attributes.organization_attributes))
      that.props.history.push('/')
    }).catch(error => {
      that.setState({ errors: error.response.data.errors.full_messages })
    })
  };

  handleChange = (user) => {
    const currentUser = this.state.user;
    currentUser[user.target.name] = user.target.value;
    this.setState(currentUser);
  };

  handleChangeForOrganization = (user) => {
    const currentOrganization = this.state.user;
    currentOrganization['user_organization_attributes']['organization_attributes'][user.target.name] = user.target.value;
    this.setState(currentOrganization);
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
          <div>
            <label htmlFor="first_name">First name</label><br/>
            <input type="text" name="first_name" value={user.first_name} onChange={this.handleChange}
                   className="form-control" />
          </div>

          <div>
            <label htmlFor="last_name">Last name</label><br/>
            <input type="text" name="last_name" value={user.last_name} onChange={this.handleChange}
                   className="form-control" />
          </div>

          <div>
            <label htmlFor="email">E-mail</label><br/>
            <input type="text" name="email" value={user.email} onChange={this.handleChange}
                   className="form-control" />
          </div>

          <div>
            <label htmlFor="phone">Phone</label><br/>
            <input type="text" name="phone" value={user.phone} onChange={this.handleChange}
                   className="form-control" />
          </div>

          <div>
            <label htmlFor="password">Password</label><br/>
            <input type="password" name="password" value={user.password} onChange={this.handleChange}
                   className="form-control" />
          </div>

          <h1>Create Organization</h1>
          <div className='form-group'>
            <label htmlFor='name'>Organization Name</label>
            <br/>
            <input type='text' name="name" value={user.user_organization_attributes.organization_attributes.name}
             onChange={this.handleChangeForOrganization} className='form-control' />
          </div>
          <br/>
          <div>
            <label htmlFor='description'>Organization Description</label>
            <br/>
            <textarea name='description' rows='10' value={user.user_organization_attributes.organization_attributes.description}
           onChange={this.handleChangeForOrganization} className='form-controls' />
          </div>

          <button type="submit" className="btn_sign_up">
            Sign up
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(SignUpFormOrganizer);
