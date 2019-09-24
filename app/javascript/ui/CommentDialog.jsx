import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  button: {
    padding: 0,
  },
  dialog: {
    width: 800,
  },
});

export const CommentDialog = (params) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <IconButton className={classes.button} onClick={handleClickOpen}>
        {params.text_button}
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
          {params.comment_card}
        </DialogContent>
        <DialogActions>
          {params.content}
        </DialogActions>
      </Dialog>
    </div>
  );
};
