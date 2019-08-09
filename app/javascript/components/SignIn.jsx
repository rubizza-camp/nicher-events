import React from 'react';
import Axios from 'axios';

// Axios.interceptors.request.use(config => {
//   console.log(config);
//   config.headers['key'] = JSON.parse(sessionStorage.user);
//   return config;
// });

export default class SigInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSignIn = (e) =>{
    e.preventDefault();
    Axios({
      method: 'post',
      url: '/auth/sign_in',
      data: this.state
    }).then(response => {
      sessionStorage.setItem('user',
      JSON.stringify({
        'access-token': response.request.getResponseHeader('access-token'),
        'token-type': response.request.getResponseHeader('token-type'),
        client: response.headers["client"],
        expiry: response.headers["expiry"],
        uid: response.headers["uid"]
      }));
      sessionStorage.setItem('email', response.headers["uid"]);
      Axios.defaults.headers.common['Authorization'] = response.request.getResponseHeader('access-token');
      this.props.history.push('/');

      }).catch(error => {
      this.props.history.push('/sign_in');
      })
  };

  handleChange = (user) => {
    this.setState({ [user.target.name]: user.target.value });
  };

  render() {
    return (
        <div>
          <form onSubmit={this.handleSignIn}>
            <div>
              <label htmlFor='email'>E-mail</label><br />
              <input type="text" name="email" value={this.state.email} onChange={this.handleChange} className="form-control" />
            </div>

            <div>
              <label htmlFor='password'>Password</label><br />
              <input type="text" name="password" value={this.state.password} onChange={this.handleChange} className="form-control" />
            </div>

            <button type='submit' className='btn_sign_in'>Sign in</button>
          </form>
        </div>
    );
  }
}
