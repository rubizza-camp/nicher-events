import React from 'react';
import Axios from 'axios'
// import { Session } from 'inspector';

export default class SignUp extends React.Component{
  handleSignUp = (e) =>{
    e.preventDefault();
    Axios({
      method: 'post',
      url: '/auth',
      data: {
        email: this.email.value,
        password: this.password.value
      }
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

  render(){
    return (
      <div className="jumbotron">
        <form onSubmit={this.handleSignUp}>
          <div>
            <label htmlFor='email'>E-mail</label><br />
            <input type='text' name='email' ref={(input) => this.email = input} />
          </div>

          <div>
            <label htmlFor='password'>Password</label><br />
            <input type='password' name='password' ref={(input) => this.password = input} />
          </div>

          <button type='submit' className='btn_sign_up'>Sign up</button>
        </form>
      </div>
    );
   }
}
