import { Options } from '../types/webSocket';
import { Context, OrdersPriceMap } from '../types/orderBook';
import { ReadyState, CryptoUSDPair } from './enums';

export const ORDER_WS_URL = 'wss://www.cryptofacilities.com/ws/v1';

export const FEED = 'book_ui_1';

export const RERENDER_FREQUENCY = 3e3;

export const DISPLAY_LEVELS = 15;

export const DEFAULT_OPTIONS: Options = {
  reconnectLimit: 3,
  reconnectInterval: 2e3,
  retryOnError: true,
};

export const CONTEXT_INITIAL_STATE: Context = {
  asks: {} as OrdersPriceMap,
  bids: {} as OrdersPriceMap,
  error: null,
  numLevels: undefined,
  productId: undefined,
  readyState: ReadyState[ReadyState.UNINSTANTIATED],
  ws: undefined,
};

export const GROUP_OPTIONS = {
  [CryptoUSDPair.BTC]: [0.5, 1, 2.5],
  [CryptoUSDPair.ETH]: [0.05, 0.1, 0.25],
};
