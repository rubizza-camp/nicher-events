import React from 'react';
import AttendeeSignUpForm from './AttendeeSignUpForm';
import OrganizerSignUpForm from './OrganizerSignUpForm';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default class SignUpForm extends React.Component {
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
          <Grid container direction="column" justify="center" alignItems="center">
          <Paper position="static">
            <Tabs variant="standard" value={value} onChange={handleChange} centered textColor="inherit">
              <Tab label="Sign up as Attendee" {...a11yProps(0)}/>
              <Tab label="Sign up as Organizer" {...a11yProps(1)}/>
            </Tabs>
          </Paper>
          <TabPanel value={value} index={0}>
            <AttendeeSignUpForm history={this.props.history} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <OrganizerSignUpForm history={this.props.history} />
          </TabPanel>
          </Grid>
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
