import React, { useEffect, useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { useAppDispatch, useAppSelector } from '../../hooks/react-redux';
import { selectSnackbarAlert } from '../../state/selectors';
import { setSnackbarAlert } from '../../state/snackbarSlice';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const AppSnackbar = (): JSX.Element => {
  const classes = useStyles();
  const snackbarAlert = useAppSelector(selectSnackbarAlert);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (snackbarAlert?.type) setOpen(true);
  }, [snackbarAlert]);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpen(false);
    dispatch(setSnackbarAlert());
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          elevation={6}
          onClose={handleClose}
          severity={snackbarAlert?.type}
          variant="filled">
          {snackbarAlert?.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AppSnackbar;
