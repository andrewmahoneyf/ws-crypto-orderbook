/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CryptoUSDPair } from '../constants/enums';
import { GROUP_OPTIONS } from '../constants/orderBook';
import { OrderbookReduxState } from '../types/orderBook';

const initialState: OrderbookReduxState = {
  pair: CryptoUSDPair.BTC,
  grouping: 0.5,
};

export const orderbookSlice = createSlice({
  name: 'orderbook',
  initialState,
  reducers: {
    toggleFeed: state => {
      if (state.pair === CryptoUSDPair.BTC) state.pair = CryptoUSDPair.ETH;
      else state.pair = CryptoUSDPair.BTC;
      // eslint-disable-next-line prefer-destructuring
      state.grouping = GROUP_OPTIONS[state.pair][0];
    },
    setGrouping: (state, action: PayloadAction<number>) => {
      state.grouping = action.payload;
    },
  },
});

export const { toggleFeed, setGrouping } = orderbookSlice.actions;

export default orderbookSlice.reducer;
