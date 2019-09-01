import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export const AttendancesList = (params) => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([1]);
  const { attendances } = params;

  function Img(params) {
    let img_link = params.link;
    if (img_link == null)
    {
      img_link = 'https://robohash.org/sitsequiquia.png?size=300x300&set=set1';
    }
    return (
      <Avatar src={img_link} />
    );
  }

  return (
    <List dense className={classes.root}>
      {attendances.map(user => {
        const labelId = `checkbox-list-secondary-label-${user.id}`;
        return (
            <ListItem key={user.id} button>
              <ListItemAvatar>
                <Img link={user.link_photo} />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`${user.first_name} ${user.last_name}`} />
            </ListItem>
        );
      })}
    </List>
  );
}
