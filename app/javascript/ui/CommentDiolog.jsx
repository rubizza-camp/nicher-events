import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
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
          {params.content}
        </DialogActions>
      </Dialog>
    </div>
  );
};
