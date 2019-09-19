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
import EventInfo from '../components/event/EventInfo';
import NewEvent from '../components/event/NewEvent';
import UserProfile from '../components/UserProfile';
import InviteInfo from '../components/event/InviteInfo';

const RegisterNavigation = () => (
  <AppBar >
    <Toolbar>
      <NavButtons text='Main page' to='/' />
      <NavButtons to={ { pathname: '/sign_in', search: window.location.search } }  text='Sign in' />
      <NavButtons to={ { pathname: '/sign_up', search: window.location.search } }  text='Sign up' />
    </Toolbar>
  </AppBar>
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

const OrganizationNavigation = ({userOrganizationId}) => (
  <NavButtons to={'/organizations/' + userOrganizationId} text='Organization' />
);


const DefaultLayout = ({ component: Component, ...rest }) => {
  let navbarComponent;
  if (localStorage.user === undefined) {
    navbarComponent = <RegisterNavigation />;
  } else {
    navbarComponent = <SignOutNavigation />;
  }
  let organizationComponent;
  if (localStorage.user != null) {
    const userRole = JSON.parse(localStorage.user_attributes).role;
    if(userRole === 'organizer' && JSON.parse(localStorage.user_attributes).organization !== null) {
      const userOrganizationId = JSON.parse(localStorage.user_attributes).organization.id;
      organizationComponent = <OrganizationNavigation userOrganizationId={userOrganizationId} />;
    }
  }
  return (
    <Route {...rest} render={matchProps => (
      <div className="DefaultLayout">
        <Box pb={10}>
          {navbarComponent}
        </Box>
        <div className="Header">{navbarComponent} {organizationComponent}</div>
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
    <DefaultLayout exact path='/events/:id' component={EventInfo} />
    <DefaultLayout exact path='/venues' component={VenueIndex} />
    <DefaultLayout exact path="/venues/new" component={VenueNew} />
    <DefaultLayout exact path='/venues/:id' component={VenueShow} />
    <DefaultLayout exact path='/venues/:id/edit' component={VenueEdit} />
    <DefaultLayout exact path='/user_profile' component={UserProfile} />
    <DefaultLayout path='/events/:event_id/event_invites/:id' component={InviteInfo} />
  </Switch>
);

ReactDOM.render(
  <Router history={history}>
    <Main />
  </Router>,
  document.getElementById('root')
);
