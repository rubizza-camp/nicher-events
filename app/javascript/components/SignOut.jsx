import React from 'react';
import Axios from "axios";

export default class SignOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  componentDidMount() {
    Axios({
      method: 'delete',
      url: '/auth/sign_out',
      data: JSON.parse(sessionStorage.user)
    }).then(response => {
      sessionStorage.removeItem('user');
      this.props.history.push('/');
    }).catch(error => {
      sessionStorage.removeItem('user');
      this.setState({hasError: true})
    })
  };

  render() {
    if (this.state.hasError) {
      return <div className='errors'>You must login at first</div>;
    } else {
      return <div className='errors'>Success sign out</div>
    }
  }

}
