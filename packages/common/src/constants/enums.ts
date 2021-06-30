export enum ReadyState {
  UNINSTANTIATED = -1,
  CONNECTING,
  OPEN,
  CLOSING,
  CLOSED,
}

export enum WebSocketEvent {
  SUBSCRIBE = 'subscribe',
  UNSUBSCRIBE = 'unsubscribe',
}

export enum CryptoUSDPair {
  BTC = 'PI_XBTUSD',
  ETH = 'PI_ETHUSD',
}

export enum OrderType {
  BIDS = 'bids',
  ASKS = 'asks',
}

export enum EventType {
  SUBSCRIBED = 'subscribed',
  UNSUBSCRIBED = 'unsubscribed',
  ALERT = 'alert',
}

export enum Snackbar {
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
  SUCCESS = 'success',
}

export enum StatusCode {
  'Normal Closure' = 1000,
  'Going Away',
  'Protocol error',
  'Unsupported Data',
  '---Reserved----',
  'No Status Rcvd',
  'Abnormal Closure',
  'Invalid frame payload data',
  'Policy Violation',
  'Message Too Big',
  'Mandatory Ext.',
  'Internal Server Error',
  'TLS handshake',
}
