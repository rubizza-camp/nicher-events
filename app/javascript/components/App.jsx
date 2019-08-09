import React, { Component } from 'react';
import Home from './Home';
import VenueNew from './venue/VenueNew';
import VenueShow from './venue/VenueShow';
import VenueEdit from './venue/VenueEdit';
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
      <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/venues/new">Create venue</NavLink></li>
      <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/venues/:id">Show venue</NavLink></li>
      <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/venues/:id/edit">Edit venue</NavLink></li>
      <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/">Back</NavLink></li>
    </ul>
  </nav>
);

const Main = () => (
  <Switch>
    <Route exact path='/' />
    <Route path='/home' component={Home} />
    <Route exact path="/venues/new" component={VenueNew} />
    <Route exact path='/venues/:id' component={VenueShow} />
    <Route path='/venues/:id/edit' component={VenueEdit} />

  </Switch>
);

export default App;
