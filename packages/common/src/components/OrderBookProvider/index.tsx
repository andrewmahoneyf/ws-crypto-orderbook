import React, { createContext, useCallback, useEffect, useState } from 'react';
import useWebSocket from '../../hooks/useWebSocket';
import {
  CONTEXT_INITIAL_STATE,
  DEFAULT_OPTIONS,
  ORDER_WS_URL,
  SUBSCRIBE_EVENT,
} from '../../constants/orderBook';
import { Options } from '../../types/webSocket';
import { Context } from '../../types/orderBook';
import { ReadyState } from '../../constants/enums';

export const OrderBookContext = createContext<Context>(CONTEXT_INITIAL_STATE);

interface OrderBookProviderProps {
  children: React.ReactElement | React.ReactElement[];
}

const OrderBookProvider: React.FC<OrderBookProviderProps> = ({ children }) => {
  const [context, setContext] = useState<Context>(CONTEXT_INITIAL_STATE);
  const [shouldConnect, setShouldConnect] = useState(false);

  useEffect(() => {
    // wait for component to mount before instantiating
    setShouldConnect(true);
  }, []);

  const onOpen = useCallback((event: WebSocketEventMap['open']) => {
    console.log('onOpen', event);
    setContext(prevState => ({
      ...prevState,
      ws: event.currentTarget as WebSocket,
    }));
  }, []);

  const onClose = useCallback((event: WebSocketEventMap['close']) => {
    console.log('onClose', event);
  }, []);

  const onMessage = useCallback((event: WebSocketEventMap['message']) => {
    console.log('onMessage', event);
  }, []);

  const onError = useCallback((event: WebSocketEventMap['error']) => {
    console.log('onError', event);
  }, []);

  const options: Options = {
    ...DEFAULT_OPTIONS,
    onClose,
    onError,
    onMessage,
    onOpen,
  };
  const { lastMessage, readyState, sendMessage } = useWebSocket(
    ORDER_WS_URL,
    options,
    shouldConnect,
  );

  useEffect(() => {
    setContext(prevState => ({
      ...prevState,
      readyState: ReadyState[readyState],
    }));
  }, [readyState]);

  return (
    <OrderBookContext.Provider value={context}>
      {children}
    </OrderBookContext.Provider>
  );
};

export default OrderBookProvider;
