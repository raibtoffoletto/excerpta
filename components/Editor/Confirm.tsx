import { DeleteForever } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useState } from 'react';

export default function Confirm({
  onAccept,
  onClose,
}: {
  onAccept: () => void;
  onClose: () => void;
}) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);

    setTimeout(() => {
      onClose();
    }, 333);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Snippet</DialogTitle>

      <DialogContent>
        <DialogContentText>
          This action is permanent and cannot be undone.
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={() => {
            onAccept();
            handleClose();
          }}
          color="error"
          startIcon={<DeleteForever />}
          autoFocus
        >
          delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
