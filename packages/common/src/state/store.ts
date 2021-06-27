import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../components/counter/counterSlice';
import feedReducer from '../components/ToggleFeed/feedSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    feed: feedReducer,
  },
});
