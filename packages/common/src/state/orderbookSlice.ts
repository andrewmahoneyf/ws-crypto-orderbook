/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CryptoUSDPair } from '../constants/enums';
import { GROUP_OPTIONS } from '../constants/orderBook';
import { OrderbookReduxState } from '../types/orderBook';

const initialState: OrderbookReduxState = {
  enabled: true,
  grouping: 0.5,
  pair: CryptoUSDPair.BTC,
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
    setOrderbookEnabled: (state, action: PayloadAction<boolean>) => {
      state.enabled = action.payload;
    },
  },
});

export const { toggleFeed, setGrouping, setOrderbookEnabled } =
  orderbookSlice.actions;

export default orderbookSlice.reducer;
