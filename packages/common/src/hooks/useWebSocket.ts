import { useCallback, useEffect, useRef, useState } from 'react';
import { ReadyState } from '../constants/enums';
import {
  Options,
  SendMessage,
  WebSocketHook,
  WebSocketMessage,
} from '../types/webSocket';

const useWebSocket = (
  url: string,
  options: Options,
  shouldConnect = true,
): WebSocketHook => {
  const [readyState, setReadyState] = useState<ReadyState>(ReadyState.CLOSED);
  const [messageQueue, setMessageQueue] = useState<WebSocketMessage[]>([]);

  const webSocketRef = useRef<WebSocket>();
  const reconnectTimesRef = useRef(0);
  const reconnectTimerRef = useRef<number>();
  const reconnectRef = useRef<() => void>();
  const optionsCache = useRef<Options>(options);
  optionsCache.current = options;
  const {
    onClose,
    onError,
    onMessage,
    onOpen,
    reconnectInterval,
    reconnectLimit,
    retryOnError,
  } = optionsCache.current;

  const connect: () => void = useCallback(() => {
    webSocketRef.current = new WebSocket(url);
    webSocketRef.current.onerror = (event: WebSocketEventMap['error']) => {
      if (retryOnError && reconnectRef.current) reconnectRef.current();
      if (onError) onError(event);
      setReadyState(webSocketRef.current?.readyState || ReadyState.CLOSED);
    };
    webSocketRef.current.onopen = (event: WebSocketEventMap['open']) => {
      if (onOpen) onOpen(event);
      reconnectTimesRef.current = 0;
      setReadyState(webSocketRef.current?.readyState || ReadyState.CLOSED);
    };
    webSocketRef.current.onclose = (event: WebSocketEventMap['close']) => {
      if (onClose) onClose(event);
      setReadyState(webSocketRef.current?.readyState || ReadyState.CLOSED);
    };
    webSocketRef.current.onmessage = (event: WebSocketEventMap['message']) => {
      if (onMessage) onMessage(event);
    };
  }, [url, onClose, onError, onMessage, onOpen, retryOnError]);

  useEffect(() => {
    if (shouldConnect && readyState !== ReadyState.OPEN) {
      if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
      reconnectTimesRef.current = 0;
      connect();
    }
  }, [shouldConnect, readyState, connect]);

  const disconnect = useCallback(() => {
    if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
    webSocketRef.current?.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readyState]);

  useEffect(() => {
    return () => {
      if (readyState === ReadyState.OPEN) {
        disconnect();
      }
    };
  }, [readyState, disconnect]);

  useEffect(() => {
    const reconnect = () => {
      if (
        webSocketRef.current?.readyState !== ReadyState.OPEN &&
        (!reconnectLimit || reconnectTimesRef.current < reconnectLimit)
      ) {
        disconnect();
        reconnectTimerRef.current = window.setTimeout(() => {
          connect();
          reconnectTimesRef.current += 1;
        }, reconnectInterval);
      }
    };
    // save reconnect in a mutable ref to avoid declaration scope errors
    reconnectRef.current = reconnect;
  }, [reconnectLimit, connect, reconnectInterval, disconnect]);

  const sendMessage: SendMessage = useCallback(message => {
    if (
      webSocketRef.current &&
      webSocketRef.current?.readyState === ReadyState.OPEN
    ) {
      if (webSocketRef.current instanceof WebSocket === false)
        throw new Error('WebSocket not properly initialized');
      webSocketRef.current.send(message);
    } else {
      setMessageQueue(prevState => [...prevState, message]);
    }
  }, []);

  useEffect(() => {
    if (readyState === ReadyState.OPEN && messageQueue.length) {
      messageQueue.forEach(msg => sendMessage(msg));
      setMessageQueue([]);
    }
  }, [readyState, messageQueue, sendMessage]);

  return {
    disconnect,
    readyState,
    sendMessage,
  };
};

export default useWebSocket;
