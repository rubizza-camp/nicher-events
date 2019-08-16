import React from 'react';
import Axios from 'axios';

export default class ForgotPasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: { email: '', redirect_url: 'http://localhost:3000/reset_password' } };
    this.handleForgotPassword = this.handleForgotPassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleForgotPassword = (e) => {
    delete this.state.response_message;
    delete this.state.errors;
    e.preventDefault();
    Axios({
      method: 'post',
      url: '/auth/password',
      data: this.state.user
    }).then(response => {
        this.setState({ response_message: response.data.message })
      }).catch(error => {
        this.setState({ errors: error.response.data.errors })
      })
  };

  handleChange = (user) => {
    const currentUser = this.state.user;
    currentUser[user.target.name] = user.target.value;
    this.setState(currentUser);
  }

  render() {
    let message;
    if (this.state.errors) {
      message = <div>
                  {this.state.errors.map((error) => {
                    return(
                      <p>{error}</p>
                    )
                  })}
                </div>
    }
    if (this.state.response_message) {
      message = <div>
                  {this.state.response_message}
                </div>
    }
    return (
      <div>
        {message}
        <form onSubmit={this.handleForgotPassword}>
          <div>
            <label htmlFor='email'>E-mail</label><br />
            <input type="text" name="email" value={this.state.email} onChange={this.handleChange} className="form-control" />
          </div>

          <button type='submit' className='btn_forgot_password'>Submit</button>
        </form>
      </div>
    );
   }
}
