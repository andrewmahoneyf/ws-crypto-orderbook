import { configureStore } from '@reduxjs/toolkit';
import orderbookReducer from './orderbookSlice';
import snackbarReducer from './snackbarSlice';

export const store = configureStore({
  reducer: {
    orderbook: orderbookReducer,
    snackbar: snackbarReducer,
  },
});
