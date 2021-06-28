import { configureStore } from '@reduxjs/toolkit';
import orderbookReducer from './orderbookSlice';

export const store = configureStore({
  reducer: {
    orderbook: orderbookReducer,
  },
});
