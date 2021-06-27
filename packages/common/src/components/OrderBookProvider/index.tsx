import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import useWebSocket from '../../hooks/useWebSocket';
import {
  CONTEXT_INITIAL_STATE,
  DEFAULT_OPTIONS,
  FEED,
  ORDER_WS_URL,
} from '../../constants/orderBook';
import { Options } from '../../types/webSocket';
import {
  CryptoUSDPair,
  ReadyState,
  WebSocketEvent,
} from '../../constants/enums';
import parseOrderMessage from '../../utils/parseOrderMessage';
import reduceOrders from '../../utils/reduceOrders';

export const OrderBookContext = createContext(CONTEXT_INITIAL_STATE);

interface OrderBookProviderProps {
  children: React.ReactElement | React.ReactElement[];
}

const OrderBookProvider: React.FC<OrderBookProviderProps> = ({ children }) => {
  const [selectedPair, setSelectedPair] = useState(CryptoUSDPair.BTC);
  const [context, setContext] = useState(CONTEXT_INITIAL_STATE);
  const asksRef = useRef(CONTEXT_INITIAL_STATE.asks);
  const bidsRef = useRef(CONTEXT_INITIAL_STATE.bids);
  const [shouldConnect, setShouldConnect] = useState(false);

  useEffect(() => {
    // wait for component to mount before instantiating
    setShouldConnect(true);
  }, []);

  const handleAsks = (newAsks: [number, number][]) => {
    asksRef.current = reduceOrders(asksRef.current, newAsks);
    return asksRef.current;
  };

  const handleBids = (newBids: [number, number][]) => {
    bidsRef.current = reduceOrders(bidsRef.current, newBids);
    return bidsRef.current;
  };

  const onOpen = useCallback((event: WebSocketEventMap['open']) => {
    console.log('onOpen', event);
    const ws = event.currentTarget as WebSocket;
    setContext(prevState => ({ ...prevState, ws }));
  }, []);

  const onClose = useCallback((event: WebSocketEventMap['close']) => {
    console.log('onClose', event);
    setContext(CONTEXT_INITIAL_STATE);
  }, []);

  const onMessage = useCallback((event: WebSocketEventMap['message']) => {
    console.log('onMessage', event);
    const parsedResult = parseOrderMessage(event.data);
    if (parsedResult.error)
      setContext(prevState => ({
        ...prevState,
        error: parsedResult.error?.message,
      }));
    else {
      console.log('parsedResult', parsedResult);
      setContext(prevState => ({
        ...prevState,
        numLevels: parsedResult.value?.numLevels ?? prevState.numLevels,
        asks: handleAsks(parsedResult.value?.asks ?? []),
        bids: handleBids(parsedResult.value?.bids ?? []),
      }));
    }
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
  const { readyState, sendMessage } = useWebSocket(
    ORDER_WS_URL,
    options,
    shouldConnect,
  );

  const subscribe = useCallback(() => {
    sendMessage(
      JSON.stringify({
        event: WebSocketEvent.SUBSCRIBE,
        feed: FEED,
        product_ids: [selectedPair],
      }),
    );
  }, [selectedPair, sendMessage]);

  const unsubscribe = useCallback(() => {
    sendMessage(
      JSON.stringify({
        event: WebSocketEvent.UNSUBSCRIBE,
        feed: FEED,
        product_ids: [selectedPair],
      }),
    );
  }, [selectedPair, sendMessage]);

  const handleTogglePair = (newPair: CryptoUSDPair) => {
    unsubscribe();
    setSelectedPair(newPair);
  };

  useEffect(() => {
    const readyString = ReadyState[readyState];
    setContext(prevState => ({ ...prevState, readyState: readyString }));
    if (readyState === ReadyState.OPEN) {
      subscribe();
    }
  }, [readyState, selectedPair, subscribe]);

  return (
    <OrderBookContext.Provider value={context}>
      {children}
    </OrderBookContext.Provider>
  );
};

export default OrderBookProvider;
