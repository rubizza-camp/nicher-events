import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormButton } from './Buttons';

export const CommentDiolog = (params) => {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <FormButton onClick={handleClickOpen} color="primary" text={params.text_button} />
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
          {params.comment_card}
        </DialogContent>
        <DialogActions>
          {/* <FormButton onClick={handleClose} color="primary" text="Cancel" /> */}
          {params.content}
        </DialogActions>
      </Dialog>
    </div>
  );
}
