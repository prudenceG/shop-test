import React, { useState, useContext, useEffect } from 'react';
import Alert from '@material-ui/lab/Alert';
import GlobalContext from '../../state/global-context';
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
  const [open, setOpen] = useState(true);
  const context = useContext(GlobalContext);
  const { isOpen, contentText, severity, vertical, horizontal } = context.transitionAlert;
  const { classes } = props;
  
  useEffect(() => {
    setOpen(isOpen);
  }, [context.transitionAlert])

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