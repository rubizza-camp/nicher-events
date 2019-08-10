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
import Axios from 'axios';
import VenueNew from './venue/VenueNew';
import VenueShow from './venue/VenueShow';
import VenueEdit from './venue/VenueEdit';
import {HashRouter as Router, Route, NavLink, Switch} from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { user: {} };
  }
  handleSignOut = (e) =>{
    e.preventDefault();
    Axios({
      method: 'delete',
      url: '/auth/sign_out',
      data: JSON.parse(sessionStorage.user)
    }).then(function (response) {
        sessionStorage.removeItem('user');
        window.location ='/'
      }).catch(function(error) {
        window.location ='/'
      })
  };
  componentDidMount () {
    if(sessionStorage.user != null) {
        Axios({
            type: 'get',
            url: `/api/v1/users`,
            data: JSON.parse(sessionStorage.user)
        }).then(res => {
            let myMap = new Map();
            myMap = res.data.find(o => o.uid === sessionStorage.email);
            this.setState({ user: myMap } );
        })
    }
  }

  render() {
    const isOrganizer = this.state.user['role'] == 'organizer';
    let navigationForOrganizer;
    let registerNavigation;

    if (isOrganizer){
      navigationForOrganizer = <NavigationForOrganizer />
    }
    if (sessionStorage.user == null){
      registerNavigation = <RegisterNavigation />
    }
    return (
      <div className="App">
        <Router>
          <div className="container">
            <Navigation />
            {navigationForOrganizer}
            {registerNavigation}
            <Main />
            <h2>role: {this.state.user['role']}</h2>
            <form onSubmit={this.handleSignOut}>
              <button type='submit' className='btn_sign_out'>Sign out</button>
            </form>
          </div>
        </Router>
      </div>
    );
  }
}
const RegisterNavigation = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/sign_up">Sign up</NavLink></li>
      <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/sign_in">Sign in</NavLink></li>
    </ul>
  </nav>
)
const NavigationForOrganizer = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/events">Events</NavLink></li>
      <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/organizations">Organization</NavLink></li>
    </ul>
  </nav>
);

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
    <Route exact path='/events' component={EventList} />
    <Route exact path="/events/new" component={NewEvent} />
    <Route exact path='/events/:id' component={EventInfo} />
    <Route exact path='/events/:id/edit' component={EventEdit} />
    <Route exact path='/organizations' component={OrganizationList}  />
    <Route exact path='/organizations/new' component={OrganizationAdd} />
    <Route exact path='/organizations/:id/edit' component={OrganizationEdit} />
    <Route exact path='/organizations/:id' component={OrganizationInfo} />
    <Route path="/sign_up" component={SignUp} />
    <Route path="/sign_in" component={SignIn} />
    <Route exact path="/venues/new" component={VenueNew} />
    <Route exact path='/venues/:id' component={VenueShow} />
    <Route path='/venues/:id/edit' component={VenueEdit} />
  </Switch>
);

export default App;
