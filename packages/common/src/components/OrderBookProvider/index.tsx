import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/react-redux';
import {
  selectOrderbookEnabled,
  selectOrderbookPair,
} from '../../state/selectors';
import { setOrderbookEnabled } from '../../state/orderbookSlice';
import { useInterval, useWebSocket } from '../../hooks';
import {
  CONTEXT_INITIAL_STATE,
  DEFAULT_OPTIONS,
  FEED,
  ORDER_WS_URL,
  RERENDER_FREQUENCY,
} from '../../constants/orderBook';
import { ContextUpdater, OrderBookMessage } from '../../types/orderBook';
import { Options, WsEvent } from '../../types/webSocket';
import { EventType, ReadyState, WebSocketEvent } from '../../constants/enums';
import parseOrderMessage from '../../utils/parseOrderMessage';
import reduceOrders from '../../utils/reduceOrders';

export const OrderBookContext = createContext(CONTEXT_INITIAL_STATE);

interface OrderBookProviderProps {
  children: React.ReactElement | React.ReactElement[];
}

const OrderBookProvider: React.FC<OrderBookProviderProps> = ({ children }) => {
  const selectedPair = useAppSelector(selectOrderbookPair);
  const orderbookEnabled = useAppSelector(selectOrderbookEnabled);
  const contextRef = useRef(CONTEXT_INITIAL_STATE);
  const [renderKey, setRenderKey] = useState(0);
  const dispatch = useAppDispatch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const context = useMemo(() => contextRef.current, [renderKey]);

  useInterval(() => {
    // useRef avoids rerendering while still storing state updates
    // we can now manually trigger context update at any desired frequency
    setRenderKey(Math.random());
  }, RERENDER_FREQUENCY);

  useEffect(() => {
    // wait for component to mount before instantiating
    dispatch(setOrderbookEnabled(true));
  }, [dispatch]);

  const setContext = (values: ContextUpdater) => {
    contextRef.current = { ...contextRef.current, ...values };
  };

  const handleOrderMessage = useCallback((orders: OrderBookMessage) => {
    const { asks, bids, numLevels, product_id: productId } = orders;
    const { asks: currAsks, bids: currBids } = contextRef.current;
    setContext({
      asks: reduceOrders(currAsks, asks ?? []),
      bids: reduceOrders(currBids, bids ?? []),
      error: null,
      productId,
      ...(numLevels && { numLevels }),
    });
    // trigger re-render on first valid data received
    if (numLevels) setRenderKey(Math.random());
  }, []);

  const handleEventMessage = useCallback((data?: WsEvent) => {
    console.log('onMessage', data);
    if (data?.event === EventType.SUBSCRIBED) {
      // clear context and render app on subscribe for toggle feed
      setContext({
        bids: CONTEXT_INITIAL_STATE.bids,
        asks: CONTEXT_INITIAL_STATE.asks,
      });
      setRenderKey(Math.random());
    }
  }, []);

  const onOpen = useCallback((event: WebSocketEventMap['open']) => {
    console.log('onOpen', event);
    setContext({ ws: event.currentTarget as WebSocket });
  }, []);

  const onClose = useCallback((event: WebSocketEventMap['close']) => {
    console.log('onClose', event);
    setContext(CONTEXT_INITIAL_STATE);
    setRenderKey(Math.random());
  }, []);

  const onMessage = useCallback(
    (event: WebSocketEventMap['message']) => {
      const parsedResult = parseOrderMessage(event.data);
      if (parsedResult.error)
        setContext({ error: parsedResult.error?.message });
      else if (parsedResult.orders) {
        handleOrderMessage(parsedResult.orders);
      } else {
        handleEventMessage(parsedResult.data);
      }
    },
    [handleOrderMessage, handleEventMessage],
  );

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
  const { disconnect, readyState, sendMessage } = useWebSocket(
    ORDER_WS_URL,
    options,
    orderbookEnabled,
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
    // add readyState to context on update
    setContext({ readyState: ReadyState[readyState] });
    if (readyState === ReadyState.OPEN) subscribe();
  }, [readyState, subscribe]);

  useEffect(() => {
    // update subscriptions on toggle feed
    const { productId } = contextRef.current;
    if (productId !== selectedPair) {
      unsubscribe(productId);
      subscribe(selectedPair);
    }
  }, [selectedPair, subscribe, unsubscribe]);

  useEffect(() => {
    // trigger error if orderbook is manually disabled
    const { ws } = contextRef.current;
    if (!orderbookEnabled && ws) {
      ws.dispatchEvent(new Event('error'));
      if (DEFAULT_OPTIONS.retryOnError) {
        unsubscribe();
        disconnect();
      }
    }
  }, [orderbookEnabled, unsubscribe, disconnect]);

  return (
    <OrderBookContext.Provider value={context}>
      {children}
    </OrderBookContext.Provider>
  );
};

export default OrderBookProvider;
