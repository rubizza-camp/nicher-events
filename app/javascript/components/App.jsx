import React, { Component } from 'react';
import Home from './Home';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Axios from 'axios';
import {HashRouter as Router, Route, NavLink, Switch} from 'react-router-dom'
import history from "../packs/history";


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state ={};
    this.handleSignOut = this.handleSignOut.bind(this)
  }

  handleSignOut = (e) => {
    e.preventDefault();
    Axios({
      method: 'delete',
      url: '/auth/sign_out',
      data: JSON.parse(sessionStorage.user)
    }).then(response => {
      debugger;
      this.props.history.push('/');
    }).catch(error => {
      this.setState({ errors: error.response.data.errors })
    })
  };

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
      <div className="App">
        {message}
        <Router>
          <div className="container">
            <Navigation />
            <Main />
            <div>
              <form onSubmit={this.handleSignOut}>
                <button type='submit' className='btn_sign_out'>Sign out</button>
              </form>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

const Navigation = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/home">Home</NavLink></li>
      <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/">Back</NavLink></li>
      <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/sign_up">Sign up</NavLink></li>
      <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/sign_in">Sign in</NavLink></li>
    </ul>
  </nav>
);

const Main = () => (
  <Switch>
    <Route exact path="/"  />
    <Route path="/home" component={Home} />
    <Route path="/sign_up" component={SignUp} />
    <Route path="/sign_in" component={SignIn} />
  </Switch>
);
