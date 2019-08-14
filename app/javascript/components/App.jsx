import React, {Component} from 'react';
import Home from './Home';
import VenueIndex from './venue/VenueIndex';
import VenueNew from './venue/VenueNew';
import VenueShow from './venue/VenueShow';
import VenueEdit from './venue/VenueEdit';
import SignUp from './SignUp';
import SignIn from './SignIn';
import SignOut from './SignOut';
import {HashRouter as Router, Route, NavLink, Switch} from 'react-router-dom'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let navbarComponent;
    if (sessionStorage.user == null) {
      navbarComponent = <RegisterNavigation/>
    } else {
      navbarComponent = <SignOutNavigation/>
    }

    return (
      <div className="App">
        <Router>
          <div className="container">
            <Navigation/>
            {navbarComponent}
            <Main/>
            <div>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

const RegisterNavigation = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/sign_up">Sign
        up</NavLink></li>
      <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/sign_in">Sign
        in</NavLink></li>
    </ul>
  </nav>
);
const SignOutNavigation = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/sign_out">Sign
        out</NavLink></li>
      <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/venues">Venues
      </NavLink></li>
    </ul>
  </nav>
);

const Navigation = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <NavLink exact className="nav-link" activeClassName="active" to="/home">Home</NavLink>
      </li>
      <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/">Back</NavLink></li>
    </ul>
  </nav>
);

const Main = () => (
  <Switch>
    <Route exact path="/"/>
    <Route path="/home" component={Home}/>
    <Route path="/sign_up" component={SignUp}/>
    <Route path="/sign_in" component={SignIn}/>
    <Route path="/sign_out" component={SignOut}/>
    <Route exact path='/venues' component={VenueIndex} />
    <Route exact path="/venues/new" component={VenueNew} />
    <Route exact path='/venues/:id' component={VenueShow} />
    <Route exact path='/venues/:id/edit' component={VenueEdit} />
  </Switch>
);
