import React, { Component } from 'react';
import Home from './Home';
import EventList from './EventList';
import EventAdd from './EventAdd';
import EventInfo from './EventInfo';
import EventEdit from './EventEdit';
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
      <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/">Back</NavLink></li>
    </ul>
  </nav>
);

const Main = () => (
  <Switch>
    <Route exact path='/' />
    <Route path='/home' component={Home} />
    <Route path='/events' component={EventList} />
    <Route path="/events/new" component={EventAdd} />
    <Route path='/events/:id' component={EventInfo} />
    <Route path='/events/:id/edit' component={EventEdit} />
  </Switch>
);

export default App;
