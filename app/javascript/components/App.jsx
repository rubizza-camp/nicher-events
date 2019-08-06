import React, { Component } from 'react';
import Home from './Home';
import SignUp from './SignUp';
import SignIn from './SignIn';
import {HashRouter as Router, Route, NavLink, Switch} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div className="container">
            <Navigation />
            <Main />
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
      {/* <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/???">Sign out</NavLink></li> */}
    </ul>
  </nav>
);

const Main = () => (
  <Switch>
    <Route exact path="/" />
    <Route path="/home" component={Home} />
    <Route path="/sign_up" component={SignUp} />
    <Route path="/sign_in" component={SignIn} />
  </Switch>
);

export default App;
