import React, { useContext } from 'react';
import { OrderBookContext } from '../OrderBookProvider';

const OrderBook: React.FC = () => {
  const context = useContext(OrderBookContext);
  console.log('context', context);

  return null;
};

export default OrderBook;
