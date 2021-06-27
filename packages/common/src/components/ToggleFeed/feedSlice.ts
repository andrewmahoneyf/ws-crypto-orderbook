/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CryptoUSDPair } from '../../constants/enums';

export interface FeedState {
  pair: CryptoUSDPair;
}

const initialState: FeedState = {
  pair: CryptoUSDPair.BTC,
};

export const counterSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    toggle: state => {
      if (state.pair === CryptoUSDPair.BTC) state.pair = CryptoUSDPair.ETH;
      else state.pair = CryptoUSDPair.BTC;
    },
  },
});

export const { toggle } = counterSlice.actions;

export default counterSlice.reducer;
