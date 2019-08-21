import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';
import history from './history';
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
import SignOut from '../components/SignOut';
import ForgotPassword from '../components/ForgotPassword';
import ResetPassword from '../components/ResetPassword';
import Box from '@material-ui/core/Box';
import { NavButtons } from '../ui/Buttons'
import AppBar from '@material-ui/core/AppBar';
import { Router, Route, NavLink, Switch } from 'react-router-dom';
import { Toolbar } from '@material-ui/core';

const RegisterNavigation = () => (
  <AppBar >
    <Toolbar>
    <NavButtons text='Main page' to="/"  />
    <NavButtons to="/sign_in" text='Sign in' />
    <NavButtons  to="/sign_up" text='Sign up' />
    </Toolbar>
  </AppBar>
);

const SignOutNavigation = () => (
  <AppBar >
    <Toolbar>
    <NavButtons to="/" text='Main page' />
    <NavButtons to="/sign_out" text='Sign Out' />
    </Toolbar>
  </AppBar>
);


const DefaultLayout = ({ component: Component, ...rest }) => {
  let userInfo = '';
  if (sessionStorage.user_attributes !== undefined) {
    const { first_name, last_name, role } = JSON.parse(
      sessionStorage.user_attributes);
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
        <Box pb={10}>
          {navbarComponent}
        </Box>
        <Component {...matchProps} />
      </div>
    )}/>
  );
};

const Main = () => (
  <Switch>
    <DefaultLayout exact path="/" component={App} />
    <DefaultLayout exact path="/sign_up" component={SignUp}/>
    <DefaultLayout exact path="/sign_in" component={SignIn}/>
    <DefaultLayout exact path="/sign_out" component={SignOut}/>
    <DefaultLayout exact path="/forgot_password" component={ForgotPassword}/>
    <DefaultLayout path="/reset_password" component={ResetPassword}/>
  </Switch>
);

ReactDOM.render(
  <Router history={history}>
    <Main />
  </Router>,
  document.getElementById('root')
);
