import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';
import history from './history';
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import SignOut from "../components/SignOut";
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
        <NavLink exact className="nav-link" activeClassName="active" to="/sign_out">Sign out</NavLink>
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
    </ul>
  </nav>
);

const DefaultLayout = ({component: Component, ...rest}) => {
  let navbarComponent;
  if (sessionStorage.user == null) {
    navbarComponent = <RegisterNavigation/>
  } else {
    navbarComponent = <SignOutNavigation/>
  }
  return (
    <Route {...rest} render={matchProps => (
      <div className="DefaultLayout">
        <div className="Header">{navbarComponent}<MainNavigation/></div>
        <Component {...matchProps} />
      </div>
    )} />
  )
};

const Main = () => (
  <Switch>
    <DefaultLayout exact path="/" component={App} />
    <DefaultLayout path="/sign_up" component={ SignUp }/>
    <DefaultLayout path="/sign_in" component={ SignIn }/>
    <DefaultLayout path="/sign_out" component={ SignOut }/>
  </Switch>
);

ReactDOM.render(
  <Router history={ history }>
    <Main/>
  </Router>,
  document.getElementById('root')
);
