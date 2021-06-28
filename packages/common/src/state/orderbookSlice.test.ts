import counterReducer, { setGrouping, toggleFeed } from './orderbookSlice';
import { OrderbookReduxState } from '../types/orderBook';
import { CryptoUSDPair } from '../constants/enums';

describe('orderbook reducer', () => {
  const initialState: OrderbookReduxState = {
    pair: CryptoUSDPair.BTC,
    grouping: 0.5,
  };

  it('should handle initial state', () => {
    expect(counterReducer(undefined, { type: 'unknown' })).toEqual({
      pair: 'PI_XBTUSD',
      grouping: 0.5,
    });
  });

  it('should handle toggleFeed', () => {
    const actual = counterReducer(initialState, toggleFeed());
    expect(actual.grouping).toEqual(CryptoUSDPair.ETH);
  });

  it('should handle setGrouping', () => {
    const actual = counterReducer(initialState, setGrouping(1));
    expect(actual.grouping).toEqual(1);
  });
});
