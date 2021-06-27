export interface OrdersPriceMap {
  [price: number]: number;
}

export interface Context {
  asks: OrdersPriceMap;
  bids: OrdersPriceMap;
  error?: string | null;
  numLevels?: number;
  productId?: string;
  readyState: string;
  ws?: WebSocket;
}

// used to check setContext param values without defining required keys
export interface ContextUpdater {
  asks?: OrdersPriceMap;
  bids?: OrdersPriceMap;
  error?: string | null;
  numLevels?: number;
  productId?: string;
  readyState?: string;
  ws?: WebSocket;
}

export interface OrderBookMessage {
  asks: [number, number][];
  bids: [number, number][];
  feed: string;
  numLevels?: number;
  product_id: string;
}
