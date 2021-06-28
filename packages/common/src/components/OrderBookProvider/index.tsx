import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useAppSelector } from '../../hooks/react-redux';
import { selectOrderbookPair } from '../../state/selectors';
import { useInterval, useWebSocket } from '../../hooks';
import {
  CONTEXT_INITIAL_STATE,
  DEFAULT_OPTIONS,
  FEED,
  ORDER_WS_URL,
  RERENDER_FREQUENCY,
} from '../../constants/orderBook';
import { ContextUpdater } from '../../types/orderBook';
import { Options } from '../../types/webSocket';
import { ReadyState, WebSocketEvent } from '../../constants/enums';
import parseOrderMessage from '../../utils/parseOrderMessage';
import reduceOrders from '../../utils/reduceOrders';

export const OrderBookContext = createContext(CONTEXT_INITIAL_STATE);

interface OrderBookProviderProps {
  children: React.ReactElement | React.ReactElement[];
}

const OrderBookProvider: React.FC<OrderBookProviderProps> = ({ children }) => {
  const selectedPair = useAppSelector(selectOrderbookPair);
  const contextRef = useRef(CONTEXT_INITIAL_STATE);
  const [shouldConnect, setShouldConnect] = useState(false);
  const [renderKey, setRenderKey] = useState(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const context = useMemo(() => contextRef.current, [renderKey]);

  useInterval(() => {
    // useRef avoids rerendering while still storing state updates
    // we can now manually trigger context update at any desired frequency
    setRenderKey(Math.random());
  }, RERENDER_FREQUENCY);

  const setContext = (values: ContextUpdater) => {
    contextRef.current = { ...contextRef.current, ...values };
  };

  useEffect(() => {
    // wait for component to mount before instantiating
    setShouldConnect(true);
  }, []);

  const onOpen = useCallback((event: WebSocketEventMap['open']) => {
    console.log('onOpen', event);
    setContext({ ws: event.currentTarget as WebSocket });
  }, []);

  const onClose = useCallback((event: WebSocketEventMap['close']) => {
    console.log('onClose', event);
    setContext(CONTEXT_INITIAL_STATE);
  }, []);

  const onMessage = useCallback((event: WebSocketEventMap['message']) => {
    const parsedResult = parseOrderMessage(event.data);
    if (parsedResult.error) setContext({ error: parsedResult.error?.message });
    else if (parsedResult.value) {
      const {
        asks,
        bids,
        numLevels,
        product_id: productId,
      } = parsedResult.value;
      const { asks: currAsks, bids: currBids } = contextRef.current;
      setContext({
        asks: reduceOrders(currAsks, asks ?? []),
        bids: reduceOrders(currBids, bids ?? []),
        error: null,
        productId,
        ...(numLevels && { numLevels }),
      });
      // trigger re-render on first valid data received
      if (numLevels) setRenderKey(1);
    } else {
      console.log('onMessage', event);
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

  const subscribe = useCallback(
    (pair?: string) => {
      sendMessage(
        JSON.stringify({
          event: WebSocketEvent.SUBSCRIBE,
          feed: FEED,
          product_ids: [pair || selectedPair],
        }),
      );
    },
    [selectedPair, sendMessage],
  );

  const unsubscribe = useCallback(
    (pair?: string) => {
      sendMessage(
        JSON.stringify({
          event: WebSocketEvent.UNSUBSCRIBE,
          feed: FEED,
          product_ids: [pair || selectedPair],
        }),
      );
    },
    [selectedPair, sendMessage],
  );

  useEffect(() => {
    setContext({ readyState: ReadyState[readyState] });
    if (readyState === ReadyState.OPEN) {
      subscribe();
    }
  }, [readyState, subscribe]);

  useEffect(() => {
    const { productId } = contextRef.current;
    if (productId !== selectedPair) {
      unsubscribe(productId);
      subscribe(selectedPair);
    }
  }, [selectedPair, subscribe, unsubscribe]);

  return (
    <OrderBookContext.Provider value={context}>
      {children}
    </OrderBookContext.Provider>
  );
};

export default OrderBookProvider;
