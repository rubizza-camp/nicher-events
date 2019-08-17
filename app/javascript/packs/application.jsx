import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';
import history from './history';
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
import SignOut from '../components/SignOut';
import VenueIndex from '../components/venue/VenueIndex';
import VenueNew from '../components/venue/VenueNew';
import VenueShow from '../components/venue/VenueShow';
import VenueEdit from '../components/venue/VenueEdit';
import NewOrganization from '../components/organization/NewOrganization';
import EditedOrganization from '../components/organization/EditedOrganization';
import OrganizationInfo from '../components/organization/OrganizationInfo';
import OrganizationList from '../components/organization/OrganizationList';
import EventList from '../components/event/EventList';
import UpdatedEvent from '../components/event/UpdatedEvent';
import EventInfo from '../components/event/EventInfo';
import NewEvent from '../components/event/NewEvent';
import ForgotPassword from '../components/ForgotPassword';
import ResetPassword from '../components/ResetPassword';
import {Router, Route, NavLink, Switch} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar } from '@material-ui/core';

const MainNavigation = () => (
  <div>
    <Button component={NavLink} to="/"  size="large" color="inherit">
      Main page
    </Button>
    <Button component={NavLink} to="/events"  size="large" color="inherit">
      Event
    </Button>
  </div>

);

const RegisterNavigation = () => (
  <AppBar >
    <Toolbar>
      <MainNavigation/>
      <Button component={NavLink} to="/sign_in"  size="large" color="inherit">
        Sign in
      </Button>
      <Button component={NavLink} to="/sign_up"  size="large" color="inherit">
        Sign up
      </Button>
    </Toolbar>
  </AppBar>
);

const SignOutStruct = () => {
 return <div>
    <Button component={NavLink} to="/sign_out" color="inherit"
            size="large" >
      Sign Out
    </Button>
  </div>
}

const SignOutNavigation = () => (
  <AppBar >
    <Toolbar>
      <MainNavigation/>
      <SignOutStruct />
    </Toolbar>
  </AppBar>
);



const OrganizationNavigation = () => (
  <AppBar >
    <Toolbar>
      <MainNavigation/>
      <Button component={NavLink} to="/organizations" color="inherit"
              size="large">
        Organizations
      </Button>
      <Button component={NavLink} to="/venues" color="inherit"
              size="large">
        Venues
      </Button>
      <SignOutStruct/>
    </Toolbar>
  </AppBar>
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
    const userRole = JSON.parse(sessionStorage.user_attributes).role;
    if(userRole === 'organizer') {
      navbarComponent = <OrganizationNavigation />;
    } else
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
    <DefaultLayout path="/sign_up" component={SignUp} />
    <DefaultLayout path="/sign_in" component={SignIn} />
    <DefaultLayout path="/sign_out" component={SignOut} />
    <DefaultLayout exact path='/venues' component={VenueIndex} />
    <DefaultLayout exact path="/venues/new" component={VenueNew} />
    <DefaultLayout exact path='/venues/:id' component={VenueShow} />
    <DefaultLayout exact path='/venues/:id/edit' component={VenueEdit} />
    <DefaultLayout exact path='/organizations' component={OrganizationList}  />
    <DefaultLayout exact path='/organizations/new' component={NewOrganization} />
    <DefaultLayout exact path='/organizations/:id/edit' component={EditedOrganization} />
    <DefaultLayout exact path='/organizations/:id' component={OrganizationInfo} />
    <DefaultLayout exact path="/events/new" component={NewEvent} />
    <DefaultLayout exact path='/events/:id/edit' component={UpdatedEvent} />
    <DefaultLayout exact path='/events' component={EventList} />
    <DefaultLayout exact path='/events/:id' component={EventInfo} />
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
