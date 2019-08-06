import React from 'react';
import Axios from 'axios'

export default class SignUp extends React.Component{
  handleSignUp = (e) =>{
    e.preventDefault();
    Axios({
      method: 'post',
      url: '/auth/sign_in',
      data: {
        email: this.email.value,
        password: this.password.value
      }
    }).then(function (response) {
        //console.log(response)
        window.location = "/"
      }).catch(function(error) {
        window.location = "/#/sign_in"
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

          <button type='submit' className='btn_sign_in'>Sign in</button>
        </form>
      </div>
    );
   }
}
