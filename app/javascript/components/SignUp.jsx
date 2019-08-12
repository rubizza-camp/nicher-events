import React from 'react';
import Axios from 'axios';

export default class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: {email: '', password: '', first_name: '', last_name: '', phone: '' } };
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
        this.props.history.push('/');
      }).catch(error => {
        this.props.history.push('/sign_up');
      })
  };

  handleChange = (user) => {
    const current_user = this.state.user;
    current_user[user.target.name] = user.target.value;
    this.setState(current_user);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSignUp}>
          <div>
            <label htmlFor='first_name'>First name</label><br />
            <input type="text" name="first_name" value={this.state.user.first_name} onChange={this.handleChange} className="form-control" />
          </div>

          <div>
            <label htmlFor='last_name'>Last name</label><br />
            <input type="text" name="last_name" value={this.state.user.last_name} onChange={this.handleChange} className="form-control" />
          </div>

          <div>
            <label htmlFor='email'>E-mail</label><br />
            <input type="text" name="email" value={this.state.user.email} onChange={this.handleChange} className="form-control" />
          </div>

          <div>
            <label htmlFor='phone'>Phone</label><br />
            <input type="text" name="phone" value={this.state.user.phone} onChange={this.handleChange} className="form-control" />
          </div>

          <div>
            <label htmlFor='password'>Password</label><br />
            <input type="text" name="password" value={this.state.user.password} onChange={this.handleChange} className="form-control" />
          </div>

          <button type='submit' className='btn_sign_up'>Sign up</button>
        </form>
      </div>
    );
   }
}
