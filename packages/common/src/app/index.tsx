import React from 'react';
import OrderBook from '../components/OrderBook';
import OrderBookFooter from '../components/OrderBookFooter';
import OrderBookHeader from '../components/OrderBookHeader';
import OrderBookProvider from '../components/OrderBookProvider';

const OrderBookWithContext: React.FC = () => (
  <OrderBookProvider>
    <OrderBook />
  </OrderBookProvider>
);

const App: React.FC = () => {
  return (
    <>
      <OrderBookHeader />
      <OrderBookWithContext />
      <OrderBookFooter />
    </>
  );
};

export default App;
