import { Options } from '../types/webSocket';
import { ReadyState } from './enums';

export const ORDER_WS_URL = 'wss://www.cryptofacilities.com/ws/v1';

export const SUBSCRIBE_EVENT =
  '{"event":"subscribe","feed":"book_ui_1","product_ids":["PI_XBTUSD"]}';

export const XBT = 'PI_XBTUSD';

export const ETH = 'PI_ETHUSD';

export const DEFAULT_OPTIONS: Options = {
  reconnectLimit: 3,
  reconnectInterval: 2e3,
  retryOnError: true,
};

export const CONTEXT_INITIAL_STATE = {
  readyState: ReadyState[ReadyState.UNINSTANTIATED],
  ws: undefined,
  error: null,
};
