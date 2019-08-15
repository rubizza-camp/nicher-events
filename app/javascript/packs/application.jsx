import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';
import history from './history';
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import SignOut from "../components/SignOut";
import EventList from '../components/event/EventList';
import UpdatedEvent from '../components/event/UpdatedEvent';
import EventInfo from '../components/event/EventInfo';
import NewEvent from '../components/event/NewEvent';
import {Router, Route, NavLink, Switch} from 'react-router-dom';

const RegisterNavigation = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <NavLink exact className="nav-link" activeClassName="active" to="/sign_up">Sign up</NavLink>
      </li>
      <li className="nav-item">
        <NavLink exact className="nav-link" activeClassName="active" to="/sign_in">Sign in</NavLink>
      </li>
    </ul>
  </nav>
);

const SignOutNavigation = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <NavLink exact className="nav-link" activeClassName="active" to="/sign_out">
          Sign out
        </NavLink>
      </li>
    </ul>
  </nav>
);

const MainNavigation = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <NavLink exact className="nav-link" activeClassName="active" to="/">Main</NavLink>
      </li>
      <li className="nav-item">
        <NavLink exact className="nav-link" activeClassName="active" to="/events">Event</NavLink>
      </li>
    </ul>
  </nav>
);


const DefaultLayout = ({ component: Component, ...rest }) => {
  let userInfo = '';
  if (sessionStorage.user_attributes !== undefined) {
    const { first_name, last_name, role } = JSON.parse(sessionStorage.user_attributes);
    userInfo = `${first_name} ${last_name} ${role}`;
  }

  let navbarComponent;
  if (sessionStorage.user === undefined) {
    navbarComponent = <RegisterNavigation />;
  } else {
    navbarComponent = <SignOutNavigation />;
  }
  return (
    <Route {...rest} render={matchProps => (
      <div className="DefaultLayout">
        {userInfo}
        <div className="Header">{navbarComponent}<MainNavigation /></div>
        <Component {...matchProps} />
      </div>
    )}/>
  );
};

const Main = () => (
  <Switch>
    <DefaultLayout exact path="/" component={App} />
    <DefaultLayout path="/sign_up" component={SignUp}/>
    <DefaultLayout path="/sign_in" component={SignIn}/>
    <DefaultLayout path="/sign_out" component={SignOut}/>
    <DefaultLayout exact path="/events/new" component={NewEvent} />
    <DefaultLayout exact path='/events/:id/edit' component={UpdatedEvent} />
    <DefaultLayout exact path='/events' component={EventList} />
    <DefaultLayout exact path='/events/:id' component={EventInfo} />
  </Switch>
);

ReactDOM.render(
  <Router history={history}>
    <Main />
  </Router>,
  document.getElementById('root')
);
