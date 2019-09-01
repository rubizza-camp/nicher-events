import React from 'react';
import EventInfo from './EventInfo';
import EventObjectList from '../event_object/EventObjectList';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default class EventInfoForm extends React.Component {
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
                <Tab label="Event Info" {...a11yProps(0)}/>
                <Tab label="Event Object Info" {...a11yProps(1)}/>
              </Tabs>
            </Paper>
            <TabPanel value={value} index={0}>
              <EventInfo props={this.props} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <EventObjectList props={this.props} />
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
