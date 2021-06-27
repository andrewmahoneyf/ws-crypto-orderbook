import { ReadyState } from '../constants/enums';

export interface Options {
  onClose?: (event: WebSocketEventMap['close']) => void;
  onError?: (event: WebSocketEventMap['error']) => void;
  onMessage?: (event: WebSocketEventMap['message']) => void;
  onOpen?: (event: WebSocketEventMap['open']) => void;
  reconnectInterval?: number;
  reconnectLimit?: number;
  retryOnError?: boolean;
}

export type WebSocketMessage =
  | string
  | ArrayBuffer
  | SharedArrayBuffer
  | Blob
  | ArrayBufferView;

export type SendMessage = (message: WebSocketMessage) => void;

export interface WebSocketHook {
  readyState: ReadyState;
  sendMessage: SendMessage;
}
