import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type DialogActionOptions = {
  text: React.ReactNode, variant: Extract<IserUIVariant, 'text' | 'contained' | 'outlined'>, color: Exclude<IserColor, 'active'>
}

interface ConfirmationDialogProps {
  dialogState: [boolean, SetStateCallback<boolean>],
  dialogTitle?: React.ReactNode,
  dialogContent: React.ReactNode,
  dialogActions?: { 
    confirm: DialogActionOptions,
    cancel: DialogActionOptions
  },
  onConfirm: () => void,
}

const defaultActionOptions: Required<ConfirmationDialogProps['dialogActions']> = {
  confirm: {
    text: "Confirm", variant: 'text', color: 'info'
  },
  cancel: {
    text: "Cancel", variant: 'text', color: 'warning'
  }
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({dialogState, dialogContent, onConfirm, dialogTitle='Confirm', dialogActions={confirm: defaultActionOptions.confirm, cancel: defaultActionOptions.cancel}}) => {

  const [open, setOpen] = dialogState

  const handleConfirm = () => {
    setOpen(true);
    onConfirm();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          { dialogTitle }
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color={dialogActions.cancel.color}
            variant={dialogActions.cancel.variant}
            onClick={handleClose}>
            { dialogActions.cancel.text}
          </Button>
          <Button
            color={dialogActions.confirm.color}
            variant={dialogActions.confirm.variant}
            onClick={handleConfirm}>
            { dialogActions?.confirm?.text}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmationDialog;