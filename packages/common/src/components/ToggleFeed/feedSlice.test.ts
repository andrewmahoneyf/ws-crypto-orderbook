import counterReducer, { FeedState, toggle } from './feedSlice';
import { CryptoUSDPair } from '../../constants/enums';

describe('counter reducer', () => {
  const initialState: FeedState = {
    pair: CryptoUSDPair.BTC,
  };

  it('should handle initial state', () => {
    expect(counterReducer(undefined, { type: 'unknown' })).toEqual({
      pair: 'PI_XBTUSD',
    });
  });

  it('should handle toggle', () => {
    const actual = counterReducer(initialState, toggle());
    expect(actual.pair).toEqual(CryptoUSDPair.ETH);
  });
});
