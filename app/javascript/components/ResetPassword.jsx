import React from 'react';
import Axios from 'axios';

export default class ResetPasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: { password: '',
                           password_confirmation: '',
                           "access-token": this.props.location.search.match(/access-token=(.+)&client=/)[1],
                           client: this.props.location.search.match(/client=(.+)&client_id=/)[1],
                           uid: unescape(this.props.location.search.match(/uid=(.+)$/)[1])
                          }
                  };
    this.handleResetPassword = this.handleResetPassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleResetPassword = (e) => {
    e.preventDefault();
    Axios({
      method: 'put',
      url: '/auth/password',
      data: this.state.user
    }).then(response => {
      this.props.history.push('/sign_in');
      }).catch(error => {
        this.setState({ errors: error.response.data.errors.full_messages })
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
    return (
      <div>
        {message}
        <form onSubmit={this.handleResetPassword}>
          <h1>Reset password</h1>
          <div>
            <label htmlFor='email'>Password</label><br />
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} className="form-control" />
          </div>

          <div>
            <label htmlFor='password_confirmation'>Password confirmation</label><br />
            <input type="password" name="password_confirmation" value={this.state.password_confirmation} onChange={this.handleChange} className="form-control" />
          </div>

          <button type='submit' className='btn_forgot_password'>Submit</button>
        </form>
      </div>
    );
   }
}
