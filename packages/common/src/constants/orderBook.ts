import { Options } from '../types/webSocket';
import { Context, OrdersPriceMap } from '../types/orderBook';
import { ReadyState } from './enums';

export const ORDER_WS_URL = 'wss://www.cryptofacilities.com/ws/v1';

export const FEED = 'book_ui_1';

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
  readyState: ReadyState[ReadyState.UNINSTANTIATED],
  ws: undefined,
};
