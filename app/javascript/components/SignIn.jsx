import React from 'react';
import Axios from 'axios';

export default class SigInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user: {email: '', password: ''}};
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSignIn = (e) => {
    e.preventDefault();
    Axios({
      method: 'post',
      url: '/auth/sign_in',
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
      this.setState({errors: error.response.data.errors})
    })
  };

  handleChange = (user) => {
    const currentUser = this.state.user;
    currentUser[user.target.name] = user.target.value;
    this.setState(currentUser);
  }

  render() {
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
        <div className='errors'>
          {errorMessages}
        </div>
        <form onSubmit={this.handleSignIn}>
          <div>
            <label htmlFor='email'>E-mail</label><br/>
            <input type="text" name="email" value={this.state.user.email} onChange={this.handleChange}
                   className="form-control"/>
          </div>

          <div>
            <label htmlFor='password'>Password</label><br/>
            <input type="password" name="password" value={this.state.user.password} onChange={this.handleChange}
                   className="form-control"/>
          </div>

          <button type='submit' className='btn_sign_in'>Sign in</button>
        </form>
      </div>
    );
  }
}
