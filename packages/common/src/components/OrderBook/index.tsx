import React, { useContext } from 'react';
import OrderBookProvider, { OrderBookContext } from '../OrderBookProvider';
import ToggleFeed from '../ToggleFeed';

const OrderBook = () => {
  const context = useContext(OrderBookContext);
  console.log('context', context);

  return <ToggleFeed />;
};

const OrderBookWithContext: React.FC = () => (
  <OrderBookProvider>
    <OrderBook />
  </OrderBookProvider>
);

export default OrderBookWithContext;
