import { RootState } from '../types/redux';
import { CryptoUSDPair } from '../constants/enums';

export const selectFeedPair = (state: RootState): CryptoUSDPair =>
  state.feed.pair;
