import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { useAppDispatch, useAppSelector } from '../../hooks/react-redux';
import { selectSnackbarAlerts } from '../../state/selectors';
import { setSnackbarAlerts } from '../../state/snackbarSlice';

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
  const snackbarAlerts = useAppSelector(selectSnackbarAlerts);
  const dispatch = useAppDispatch();

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') return;
    dispatch(setSnackbarAlerts([]));
  };

  return (
    <div className={classes.root}>
      {snackbarAlerts.map(({ type, message }, i) => (
        <Snackbar
          key={`${type}-${message}`}
          open
          autoHideDuration={3000}
          onClose={handleClose}
          style={{ bottom: 52 * i + 10 }}>
          <Alert
            elevation={6}
            onClose={handleClose}
            severity={type}
            variant="filled">
            {message}
          </Alert>
        </Snackbar>
      ))}
    </div>
  );
};

export default AppSnackbar;
