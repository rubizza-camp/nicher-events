import React from 'react';
import Axios from 'axios'

export default class SignOut extends React.Component{
  handleSignOut = (e) =>{
    e.preventDefault();
    Axios({
      method: 'delete',
      url: '/auth/sign_out',
      data: JSON.parse(sessionStorage.user)
    }).then(function (response) {
        window.location = "/"
      }).catch(function(error) {
        window.location = "/#/sign_out"
      })
  };

  render(){
    return (
      <div className="jumbotron">
        <form onSubmit={this.handleSignOut}>
          <button type='submit' className='btn_sign_out'>Sign out</button>
        </form>
      </div>
    );
   }
}
