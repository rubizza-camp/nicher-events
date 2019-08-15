/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

import Home from '../components/Home';

console.log('Hello World from Webpacker')

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
    </ul>
  </nav>
);

let navbarComponent;
if (sessionStorage.user == null) {
  navbarComponent = <RegisterNavigation/>
} else {
  navbarComponent = <SignOutNavigation/>
}

const DefaultLayout = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={matchProps => (
      <div className="DefaultLayout">
        <div className="Header">{navbarComponent}</div>
        <Component {...matchProps} />
      </div>
    )} />
  )
};

const Main = () => (
  <Switch>
    <DefaultLayout exact path="/" component={App} />
    <DefaultLayout path="/home" component={Home} />
    <Route path="/sign_up" component={ SignUp }/>
    <Route path="/sign_in" component={ SignIn }/>
    <Route path="/sign_out" component={ SignOut }/>
  </Switch>
);
ReactDOM.render(
  <Router history={ history }>
    <Main/>
  </Router>,
  document.getElementById('root')
);
