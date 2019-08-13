import React from 'react';
import Axios from 'axios';

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
        role: ''
      }
    };
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (sessionStorage.user) {
      this.props.history.push('/');
    }
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
          client: response.headers['client'],
          expiry: response.headers['expiry'],
          uid: response.headers['uid']
        }));
      sessionStorage.setItem('user_attributes', JSON.stringify(response.data.data));
      this.props.history.push('/');
    }).catch(error => {
      this.setState({ errors: error.response.data.errors.full_messages });
    });
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

          <button type="submit" className="btn_sign_up" onClick={() => user.role = 'organizer'}>
            Sign up as organizer
          </button>
          <button type="submit" className="btn_sign_up" onClick={() => user.role = 'attendee'}>
            Sign up as attendee
          </button>
        </form>
      </div>
    );
  }
}
