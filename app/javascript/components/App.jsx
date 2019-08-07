import React, { Component } from 'react';
import Home from './Home';
import EventList from './event/EventList';
import NewEvent from './event/NewEvent';
import EventInfo from './event/EventInfo';
import EventEdit from './event/UpdatedEvent';
import OrganizationAdd from './organization/OrganizationAdd';
import OrganizationEdit from './organization/OrganizationEdit';
import OrganizationInfo from './organization/OrganizationInfo';
import OrganizationList from './organization/OrganizationList';
import SignUp from './SignUp';
import SignIn from './SignIn';
import SignOut from './SignOut'
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
      <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/events">Events</NavLink></li>
      <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/organizations">Organization</NavLink></li>
      <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/">Back</NavLink></li>
      <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/sign_up">Sign up</NavLink></li>
      <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/sign_in">Sign in</NavLink></li>
      <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/sign_out">Sign out</NavLink></li>
    </ul>
  </nav>
);

const Main = () => (
  <Switch>
    <Route exact path='/' />
    <Route path='/home' component={Home} />
    <Route exact path='/events' component={EventList} />
    <Route exact path="/events/new" component={NewEvent} />
    <Route exact path='/events/:id' component={EventInfo} />
    <Route exact path='/events/:id/edit' component={EventEdit} />
    <Route exact path='/organizations' component={OrganizationList}  />
    <Route exact path='/organizations/new' component={OrganizationAdd} />
    <Route exact path='/organizations/:id/edit' component={OrganizationEdit} />
    <Route exact path='/organizations/:id' component={OrganizationInfo} />
    <Route exact path="/" />
    <Route path="/home" component={Home} />
    <Route path="/sign_up" component={SignUp} />
    <Route path="/sign_in" component={SignIn} />
    <Route path="/sign_out" component={SignOut} />
  </Switch>
);

export default App;
