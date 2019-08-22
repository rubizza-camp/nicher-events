import React from 'react';
import SignUpAttendee from './SignUpAttendee';
import SignUpOrganizer from './SignUpOrganizer';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
  }

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

    const TabBar = () => {
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
    };

    return(
      <div>
        <TabBar />
      </div>
    );
  }
}
