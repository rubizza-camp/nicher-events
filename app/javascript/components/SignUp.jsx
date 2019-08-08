import React from 'react';
import Axios from 'axios';

export default class SignUp extends React.Component{
  handleSignUp = (e) =>{
    e.preventDefault();
    Axios({
      method: 'post',
      url: '/auth',
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
        window.location = "/#/sign_up"
      })
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render(){
    return (
      <div className="jumbotron">
        <form onSubmit={this.handleSignUp}>
          <div>
            <label htmlFor='email'>E-mail</label><br />
            <input type="text" name="email" value={this.state.email} onChange={this.handleChange} className="form-control" />
          </div>

          <div>
            <label htmlFor='password'>Password</label><br />
            <input type="text" name="password" value={this.state.password} onChange={this.handleChange} className="form-control" />
          </div>

          <button type='submit' className='btn_sign_up'>Sign up</button>
        </form>
      </div>
    );
   }
}
