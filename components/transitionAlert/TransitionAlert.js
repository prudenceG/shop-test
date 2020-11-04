import React, { useState, useContext, useEffect } from 'react';
import { TransitionAlert as TransitionAlertContext } from '../../store/transitionAlert';
import Alert from '@material-ui/lab/Alert';
import { withStyles, Snackbar } from '@material-ui/core'

const useStyles = () => ({
  root: {
    width: '100%',
  },
})

export const wishlistSuccessAlert = {
  isOpen: true,
  contentText: 'Product has been added to the wishlist',
  severity: 'success',
  vertical: 'top',
  horizontal: 'center',
};

export const wishlistInfoAlert = {
  isOpen: true,
  contentText: 'Product already exists in the wishlist',
  severity: 'info',
  vertical: 'top',
  horizontal: 'center',
}

const TransitionAlert = (props) => {
  const transitionAlertState = useContext(TransitionAlertContext.State);
  const [open, setOpen] = useState(true);
  
  const { isOpen, contentText, severity, vertical, horizontal } = transitionAlertState;
  const { classes } = props;
  
  useEffect(() => {
    setOpen(isOpen);
  }, [transitionAlertState])

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }}>
        <Alert onClose={handleClose} severity={severity}>
          {contentText}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default withStyles(useStyles)(TransitionAlert);