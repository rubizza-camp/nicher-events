import React from 'react';
import Axios from "axios";

export default class SignOutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidMount() {
    Axios({
      method: 'delete',
      url: '/auth/sign_out',
      data: JSON.parse(sessionStorage.user)
    }).catch(error => {
      this.setState({ hasError: true })
    }).finally(() => {
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('user_attributes');
      this.props.history.push('/');
    });

  };

  render() {
    if (this.state.hasError) {
      return <div className="errors">You must login at first</div>;
    } else {
      return <div className="errors">Success sign out</div>
    }
  }

}
