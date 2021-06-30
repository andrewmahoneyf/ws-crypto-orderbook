/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Snackbar } from '../constants/enums';

type Alert = { type: Snackbar; message: string };

interface SnackbarReduxState {
  alerts: Alert[];
}

const initialState: SnackbarReduxState = {
  alerts: [],
};

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    addSnackbarAlert: (state, action: PayloadAction<Alert>) => {
      state.alerts = [...state.alerts, action.payload];
    },
    setSnackbarAlerts: (state, action: PayloadAction<Alert[]>) => {
      state.alerts = action.payload;
    },
  },
});

export const { addSnackbarAlert, setSnackbarAlerts } = snackbarSlice.actions;

export default snackbarSlice.reducer;
