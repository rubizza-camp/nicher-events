import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';
import history from './history';
import SignUp from '../components/SignUpForm';
import SignIn from '../components/SignIn';
import SignOut from '../components/SignOut';
import VenueIndex from '../components/venue/VenueIndex';
import VenueShow from '../components/venue/VenueShow';
import VenueEdit from '../components/venue/VenueEdit';
import VenueNew from '../components/venue/VenueNew';
import ForgotPassword from '../components/ForgotPassword';
import ResetPassword from '../components/ResetPassword';
import Box from '@material-ui/core/Box';
import { NavButtons } from '../ui/Buttons';
import AppBar from '@material-ui/core/AppBar';
import EditOrganizationForm from '../components/organization/EditOrganizationForm';
import OrganizationInfo from '../components/organization/OrganizationInfo';
import { Router, Route, Switch } from 'react-router-dom';
import { Toolbar } from '@material-ui/core';
import EventList from '../components/event/EventList';
import UpdatedEvent from '../components/event/UpdatedEvent';
import EventInfoForm from '../components/event/EventInfoForm';
import NewEvent from '../components/event/NewEvent';
import UserProfile from '../components/UserProfile';
import InviteInfo from '../components/event/InviteInfo';
import EventObjectList from '../components/event_object/EventObjectList';
import NewEventObject from '../components/event_object/NewEventObject';
import EventObjectInfo from '../components/event_object/EventObjectInfo'
import EditEventObject from '../components/event_object/EditEventObject'

const RegisterNavigation = () => (
  <Box pb={10}>
    <AppBar >
      <Toolbar>
        <NavButtons text='Main page' to="/"  />
        <NavButtons to="/sign_in" text='Sign in' />
        <NavButtons  to="/sign_up" text='Sign up' />
      </Toolbar>
    </AppBar>
  </Box>
);

const SignOutNavigation = () => (
  <AppBar >
    <Toolbar>
      <NavButtons to="/" text='Main page' />
      <NavButtons to="/venues" text='Venues' />
      <NavButtons to="/user_profile" text='Your profile' />
      <NavButtons to="/sign_out" text='Sign Out' />
    </Toolbar>
  </AppBar>
);

const DefaultLayout = ({ component: Component, ...rest }) => {
  let navbarComponent;
  if (localStorage.user === undefined) {
    navbarComponent = <RegisterNavigation />;
  } else {
    navbarComponent = <SignOutNavigation />;
  }

  if (location.pathname === '/') {
    navbarComponent = '';
  }

  return (
    <Route {...rest} render={matchProps => (
      <div className="DefaultLayout">
        {navbarComponent}
        <Component {...matchProps} />
      </div>
    )}/>
  );
};

const Main = () => (
  <Switch>
    <DefaultLayout exact path="/" component={App} />
    <DefaultLayout exact path="/forgot_password" component={ForgotPassword}/>
    <DefaultLayout path="/reset_password" component={ResetPassword}/>
    <DefaultLayout path="/sign_up" component={SignUp} />
    <DefaultLayout path="/sign_in" component={SignIn} />
    <DefaultLayout path="/sign_out" component={SignOut} />
    <DefaultLayout exact path='/organizations/:id/edit' component={EditOrganizationForm} />
    <DefaultLayout exact path='/organizations/:id' component={OrganizationInfo} />
    <DefaultLayout exact path='/events/new' component={NewEvent} />
    <DefaultLayout exact path='/events/:id/edit' component={UpdatedEvent} />
    <DefaultLayout exact path='/events' component={EventList} />
    <DefaultLayout exact path='/events/:id' component={EventInfoForm} />
    <DefaultLayout exact path='/venues' component={VenueIndex} />
    <DefaultLayout exact path="/venues/new" component={VenueNew} />
    <DefaultLayout exact path='/venues/:id' component={VenueShow} />
    <DefaultLayout exact path='/venues/:id/edit' component={VenueEdit} />
    <DefaultLayout exact path='/user_profile' component={UserProfile} />
    <DefaultLayout path='/events/:event_id/event_invites/:id' component={InviteInfo} />
    <DefaultLayout exact path='/event_objects' component={EventObjectList} />
    <DefaultLayout exact path='/event_objects/new' component={NewEventObject} />
    <DefaultLayout exact path='/event_objects/:id' component={EventObjectInfo} />
    <DefaultLayout exact path='/event_objects/:id/edit' component={EditEventObject} />
  </Switch>
);

ReactDOM.render(
  <Router history={history}>
    <Main />
  </Router>,
  document.getElementById('root')
);
