export interface OrdersPriceMap {
  [price: number]: number;
}

export interface Context {
  asks: OrdersPriceMap;
  bids: OrdersPriceMap;
  error?: string | null;
  numLevels?: number;
  readyState: string;
  ws?: WebSocket;
}

export interface OrderBookMessage {
  asks: [number, number][];
  bids: [number, number][];
  feed: string;
  numLevels?: number;
  product_id: string;
}
