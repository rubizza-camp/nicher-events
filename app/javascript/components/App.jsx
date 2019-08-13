import React, { Component } from 'react';
import Home from './Home';
import SignUp from './SignUp';
import SignIn from './SignIn';
import SignOut from './SignOut';
import {HashRouter as Router, Route, NavLink, Switch} from 'react-router-dom'
import history from "../packs/history";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state ={};
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div className="container">
            <Navigation />
            <Main />
            <div>
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
      <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/sign_out">Sign out</NavLink></li>
    </ul>
  </nav>
);

const Main = () => (
  <Switch>
    <Route exact path="/" />
    <Route path="/home" component={Home} />
    <Route path="/sign_up" component={SignUp} />
    <Route path="/sign_in" component={SignIn} />
    <Route path="/sign_out" component={SignOut} />
  </Switch>
);
