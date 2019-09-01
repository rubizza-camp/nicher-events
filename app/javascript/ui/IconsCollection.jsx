import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { VpnKey, Home, Edit, Delete, Error, CheckCircle } from '@material-ui/icons';
import { PersonRounded, PersonOutlineRounded, MailRounded, PhoneRounded, Https, Store, SpeakerNotes } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  icon: {
    margin: theme.spacing(2),
  },
  iconComment: {
    margin: theme.spacing(1),
  },
  iconMessage: {
    marginRight: theme.spacing(1),
  },
  signIcon: {
    alignItems: 'flex-end',
    marginTop: theme.spacing(3),
  },
}));

export const KeyIcon = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <VpnKey className={classes.icon} color="primary" />
    </div>
  );
};

export const HomeIcon = () => {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <Home className={classes.icon} color="primary" />
    </div>
  );
};

export const EditIcon = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Edit className={classes.iconComment} color="primary" />
    </div>
  );
};

export const DeleteIcon = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Delete className={classes.iconComment} color="primary" />
    </div>
  );
};

export const CheckCircleIcon = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CheckCircle className={classes.iconMessage} />
    </div>
  );
};

export const ErrorIcon = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Error className={classes.iconMessage} />
    </div>
  );
};

export const PersonRoundedIcon = () => {
  const classes = useStyles();

  return (
      <PersonRounded className={classes.signIcon} color="primary" fontSize='large' />
  );
};

export const PersonOutlineRoundedIcon = () => {
  const classes = useStyles();

  return (
      <PersonOutlineRounded className={classes.signIcon} color="primary" fontSize='large' />
  );
};

export const MailRoundedIcon = () => {
  const classes = useStyles();

  return (
      <MailRounded className={classes.signIcon} color="primary" fontSize='large' />
  );
};

export const PhoneRoundedIcon = () => {
  const classes = useStyles();

  return (
      <PhoneRounded className={classes.signIcon} color="primary" fontSize='large' />
  );
};

export const HttpsIcon = () => {
  const classes = useStyles();

  return (
      <Https className={classes.signIcon} color="primary" fontSize='large' />
  );
};

export const StoreIcon = () => {
  const classes = useStyles();

  return (
      <Store className={classes.signIcon} color="primary" fontSize='large' />
  );
};

export const SpeakerNotesIcon = () => {
  const classes = useStyles();

  return (
      <SpeakerNotes className={classes.signIcon} color="primary" fontSize='large' />
  );
};

