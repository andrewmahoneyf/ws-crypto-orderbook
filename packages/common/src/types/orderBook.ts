import { Dispatch, SetStateAction } from 'react';
import { CryptoUSDPair } from '../constants/enums';

export interface OrderbookReduxState {
  pair: CryptoUSDPair;
  grouping: number;
}

export interface OrdersPriceMap {
  [price: number]: number;
}

export interface Context {
  asks: OrdersPriceMap;
  bids: OrdersPriceMap;
  disconnect: () => void;
  error?: string | null;
  numLevels?: number;
  productId?: string;
  readyState: string;
  setShouldConnect: Dispatch<SetStateAction<boolean>>;
  ws?: WebSocket;
}

// used to check setContext param values without defining required keys
export interface ContextUpdater {
  asks?: OrdersPriceMap;
  bids?: OrdersPriceMap;
  disconnect?: () => void;
  error?: string | null;
  numLevels?: number;
  productId?: string;
  readyState?: string;
  setShouldConnect?: Dispatch<SetStateAction<boolean>>;
  ws?: WebSocket;
}

export interface OrderBookMessage {
  asks: [number, number][];
  bids: [number, number][];
  feed: string;
  numLevels?: number;
  product_id: string;
}
