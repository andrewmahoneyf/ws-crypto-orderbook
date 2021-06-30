/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Snackbar } from '../constants/enums';

interface SnackbarReduxState {
  alert?: { type?: Snackbar; message?: string };
}

const initialState: SnackbarReduxState = {
  alert: undefined,
};

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    setSnackbarAlert: (
      state,
      action: PayloadAction<SnackbarReduxState['alert']>,
    ) => {
      state.alert = action.payload;
    },
  },
});

export const { setSnackbarAlert } = snackbarSlice.actions;

export default snackbarSlice.reducer;
