import React, { useContext } from 'react';
import OrderBookProvider, { OrderBookContext } from '../OrderBookProvider';

const OrderBook = () => {
  const context = useContext(OrderBookContext);

  console.log('context', context);

  return <div>orderBook</div>;
};

const OrderBookWithContext = () => (
  <OrderBookProvider>
    <OrderBook />
  </OrderBookProvider>
);

export default OrderBookWithContext;