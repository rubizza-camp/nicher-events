import React from 'react';
import Axios from 'axios';
import SignUpAttendee from './SignUpAttendee';
import SignUpOrganizer from './SignUpOrganizer';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
<<<<<<< HEAD
    this.state = {
      user: {
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        phone: '',
        role: '',
        password_confirmation: ''
      }
    };
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
=======
    console.log(this.props);
  } 
>>>>>>> Add signup

  render() {
    const useStyles = makeStyles(theme => ({
      root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
      },
    }));

    function TabPanel(props) {
      const { children, value, index, ...other } = props;

      return (
        <Typography
          component="div"
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
        >
          <Box p={3}>{children}</Box>
        </Typography>
      );
    }

    TabPanel.propTypes = {
      children: PropTypes.node,
      index: PropTypes.any.isRequired,
      value: PropTypes.any.isRequired,
    };

    function a11yProps(index) {
      return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
      };
    }

    const TabSign = () => {
      const classes = useStyles();
      const [value, setValue] = React.useState(0);

      function handleChange(event, newValue) {
        setValue(newValue);
      }

      return(
        <div className={classes.root}>
          <AppBar position="static">
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
              <Tab label="Sign up as Attendee" {...a11yProps(0)}/>
              <Tab label="Sign up as Organizer" {...a11yProps(1)}/>
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <SignUpAttendee history={this.props.history} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <SignUpOrganizer history={this.props.history} />
          </TabPanel>
         </div>
      );
    }    

<<<<<<< HEAD
          <div>
            <label htmlFor='password_confirmation'>Password confirmation</label><br />
            <input type="password" name="password_confirmation" value={this.state.password_confirmation} onChange={this.handleChange} className="form-control" />
          </div>

          <button type="submit" className="btn_sign_up" onClick={() => user.role = 'organizer'}>
            Sign up as organizer
          </button>
          <button type="submit" className="btn_sign_up" onClick={() => user.role = 'attendee'}>
            Sign up as attendee
          </button>
        </form>
=======
    return(
      <div>
        <TabSign />
>>>>>>> Add signup
      </div>
      );
  }
}