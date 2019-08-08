import React from 'react';
import Axios from 'axios';

export default class SignIn extends React.Component{
  handleSignIn = (e) =>{
    e.preventDefault();
    Axios({
      method: 'post',
      url: '/auth/sign_in',
      data: this.state
    }).then(function (response) {
      sessionStorage.setItem('user',
      JSON.stringify({
        'access-token': response.request.getResponseHeader('access-token'),
        'token-type': response.request.getResponseHeader('token-type'),
        client: response.headers["client"],
        expiry: response.headers["expiry"],
        uid: response.headers["uid"]
      }));
        window.location = "/"
      }).catch(function(error) {
        window.location = "/#/sign_in"
      })
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render(){
    return (
      <div className="jumbotron">
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
